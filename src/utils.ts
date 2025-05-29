import {Parameter} from '@buildwithlayer/openapi-zod-spec/3/1/1/parameter.js';
import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/3/1/1/schema.js';
import {APITool, InputSchema} from './types.js';

export const schemaIsRequired = (schema: Schema, defs: Record<string, Schema>): boolean => {
    if (typeof schema === 'boolean') return false;

    if (schema.required) {
        return schema.required.length > 0;
    }

    if (schema.allOf) {
        let allOfRequired = false;
        for (const item of schema.allOf) {
            if (typeof item === 'boolean') continue;
            else if (item.$ref) {
                const defsKey = item.$ref.split('/').at(-1);
                if (defsKey === undefined || !(defsKey in defs)) continue;
                const subSchema = defs[defsKey];
                if (schemaIsRequired(subSchema, defs)) {
                    allOfRequired = true;
                    break;
                }
            } else if (schemaIsRequired(item, defs)) {
                allOfRequired = true;
                break;
            }
        }

        if (allOfRequired) return true;
    }

    if (schema.anyOf) {
        let anyOfRequired = true;
        for (const item of schema.anyOf) {
            if (!anyOfRequired) break;
            if (typeof item === 'boolean') {
                anyOfRequired = false;
            } else if (item.$ref) {
                const defsKey = item.$ref.split('/').at(-1);
                if (defsKey === undefined || !(defsKey in defs)) continue;
                const subSchema = defs[defsKey];
                anyOfRequired = anyOfRequired && schemaIsRequired(subSchema, defs);
            } else {
                anyOfRequired = anyOfRequired && schemaIsRequired(item, defs);
            }
        }

        if (anyOfRequired) return true;
    }

    if (schema.oneOf) {
        let oneOfRequired = true;
        for (const item of schema.oneOf) {
            if (!oneOfRequired) break;
            if (typeof item === 'boolean') {
                oneOfRequired = false;
            } else if (item.$ref) {
                const defsKey = item.$ref.split('/').at(-1);
                if (defsKey === undefined || !(defsKey in defs)) continue;
                const subSchema = defs[defsKey];
                oneOfRequired = oneOfRequired && schemaIsRequired(subSchema, defs);
            } else {
                oneOfRequired = oneOfRequired && schemaIsRequired(item, defs);
            }
        }

        if (oneOfRequired) return true;
    }

    if (schema.$ref) {
        const refValue = schema.$ref.split('/').at(-1);
        if (refValue && refValue in defs) {
            return schemaIsRequired(defs[refValue], defs);
        }
    }

    return false;
};

export const apiToolToInputSchema = (apiTool: APITool, overrides: { [propertyName: string]: unknown }): InputSchema => {
    const properties: SchemaObject['properties'] = {};
    const required: string[] = [];

    if (apiTool.auth && apiTool.auth.length > 0) {
        const authProperties: SchemaObject['properties'] = {};
        const authRequired: string[] = [];

        for (const auth of apiTool.auth) {
            const item: SchemaObject = {
                type: 'string',
            };
            if (auth.description) {
                item.description = auth.description;
            }
            if (auth.key in overrides) {
                item.default = overrides[auth.key];
            }
            authProperties[auth.key] = item;
            authRequired.push(auth.key);
        }

        if (authRequired.length === 1) {
            properties['auth'] = {
                properties: authProperties,
                required: authRequired,
                type: 'object',
            };
        } else {
            properties['auth'] = {
                oneOf: authRequired.map(key => ({required: [key]})),
                properties: authProperties,
                type: 'object',
            };
        }

        properties['auth'].default = {};
    }

    if (apiTool.params && apiTool.params.length > 0) {
        const paramProperties: SchemaObject['properties'] = {};
        const paramRequired: string[] = [];

        for (const param of apiTool.params) {
            if ('schema' in param) {
                const schema = structuredClone(param.schema);
                if (param.name in overrides && typeof schema !== 'boolean') {
                    schema.default = overrides[param.name];
                }
                paramProperties[param.name] = schema;
                if (param.required) paramRequired.push(param.name);
            }
        }

        if (paramRequired.length > 0) {
            properties['params'] = {
                properties: paramProperties,
                required: paramRequired,
                type: 'object',
            };
        } else {
            properties['params'] = {
                properties: paramProperties,
                type: 'object',
            };
        }

        properties['params'].default = {};
    }

    if (apiTool.body) {
        properties['body'] = apiTool.body;
        if (schemaIsRequired(apiTool.body, apiTool.defs ?? {})) {
            required.push('body');
        }
    }

    const inputSchema: InputSchema = {type: 'object'};
    if (Object.keys(properties).length > 0) {
        inputSchema.properties = properties;
    }
    if (required.length > 0) {
        inputSchema.required = required;
    }
    if (Object.keys(apiTool.defs ?? {}).length > 0) {
        inputSchema.$defs = apiTool.defs;
    }

    return inputSchema;
};

const serializeSchemaParameter = (param: Parameter, paramValue: unknown): string | undefined => {
    if (paramValue === undefined || paramValue === null || 'content' in param) return undefined;
    if (Array.isArray(paramValue)) {
        switch (param.style) {
            case 'matrix': {
                if (param.explode) {
                    return paramValue.map(value => `;${param.name}=${encodeURIComponent(value)}`).join('');
                } else {
                    return `;${param.name}=${paramValue.map(value => encodeURIComponent(value)).join(',')}`;
                }
            }
            case 'label': {
                return `.${paramValue.map(value => encodeURIComponent(value)).join('.')}`;
            }
            case 'simple': {
                return paramValue.map(value => encodeURIComponent(value)).join(',');
            }
            default:
                throw new Error('Unsupported style: ' + param.style);
        }
    } else if (typeof paramValue === 'object') {
        switch (param.style) {
            case 'matrix': {
                if (param.explode) {
                    return Object.entries(paramValue).map(([k, v]) => `;${k}=${encodeURIComponent(v)}`).join('');
                } else {
                    return `;${param.name}=${Object.entries(paramValue).map(([k, v]) => `${k},${encodeURIComponent(v)}`).join(',')}`;
                }
            }
            case 'label': {
                if (param.explode) {
                    return Object.entries(paramValue).map(([k, v]) => `.${k}=${encodeURIComponent(v)}`).join('');
                } else {
                    return Object.entries(paramValue).map(([k, v]) => `.${k}.${encodeURIComponent(v)}`).join('');
                }
            }
            case 'simple': {
                if (param.explode) {
                    return Object.entries(paramValue).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join(',');
                } else {
                    return Object.entries(paramValue).map(([k, v]) => `${k},${encodeURIComponent(v)}`).join(',');
                }
            }
            default:
                throw new Error('Unsupported style: ' + param.style);
        }
    } else {
        switch (param.style) {
            case 'matrix': {
                return `;${param.name}=${encodeURIComponent(`${paramValue}`)}`;
            }
            case 'label': {
                return `.${encodeURIComponent(`${paramValue}`)}`;
            }
            case 'simple': {
                return encodeURIComponent(`${paramValue}`);
            }
            default:
                throw new Error('Unsupported style: ' + param.style);
        }
    }
};

const serializeContentParameter = (param: Parameter, paramValue: string | string[] | object | undefined): string | undefined => {
    throw new Error('Not implemented');
};

export const serializeParameter = (param: Parameter, paramValue: string | string[] | object | undefined): string | undefined => {
    return 'content' in param ? serializeContentParameter(param, paramValue) : serializeSchemaParameter(param, paramValue);
};

export const buildUrlFromParameters = (url: string, parameters?: Parameter[], paramValues?: Record<string, string | string[] | object | undefined>): string => {
    if (parameters === undefined || parameters.length === 0) {
        return url;
    }

    const pathParams = parameters.filter(param => param.in === 'path');
    for (const param of pathParams) {
        if (paramValues === undefined || !(param.name in paramValues)) continue;
        const serialized = serializeParameter(param, paramValues[param.name]);
        if (serialized === undefined) {
            throw new Error(`Failed to serialize parameter ${param.name}`);
        }
        url = url.replace(`{${param.name}}`, serialized);
    }

    return url;
};