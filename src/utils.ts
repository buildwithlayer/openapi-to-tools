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

const stripFormat = (schema: Schema) => {
    if (typeof schema === 'boolean') return schema;

    if ('format' in schema) delete schema['format'];

    if (schema.$defs !== undefined) {
        for (const value of Object.values(schema.$defs)) {
            stripFormat(value);
        }
    }

    if (schema.additionalProperties !== undefined) stripFormat(schema.additionalProperties);

    if (schema.allOf !== undefined) {
        for (const value of schema.allOf) {
            stripFormat(value);
        }
    }

    if (schema.anyOf !== undefined) {
        for (const value of schema.anyOf) {
            stripFormat(value);
        }
    }

    if (schema.contains !== undefined) stripFormat(schema.contains);

    if (schema.contentSchema !== undefined) stripFormat(schema.contentSchema);

    if (schema.dependentSchemas !== undefined) {
        for (const value of Object.values(schema.dependentSchemas)) {
            stripFormat(value);
        }
    }

    if (schema.else !== undefined) stripFormat(schema.else);

    if (schema.if !== undefined) stripFormat(schema.if);

    if (schema.items !== undefined) stripFormat(schema.items);

    if (schema.not !== undefined) stripFormat(schema.not);

    if (schema.oneOf !== undefined) {
        for (const value of schema.oneOf) {
            stripFormat(value);
        }
    }

    if (schema.patternProperties !== undefined) {
        for (const value of Object.values(schema.patternProperties)) {
            stripFormat(value);
        }
    }

    if (schema.prefixItems !== undefined) {
        for (const value of schema.prefixItems) {
            stripFormat(value);
        }
    }

    if (schema.properties !== undefined) {
        for (const value of Object.values(schema.properties)) {
            stripFormat(value);
        }
    }

    if (schema.propertyNames !== undefined) stripFormat(schema.propertyNames);

    if (schema.then !== undefined) stripFormat(schema.then);

    if (schema.unevaluatedItems !== undefined) stripFormat(schema.unevaluatedItems);

    if (schema.unevaluatedProperties !== undefined) stripFormat(schema.unevaluatedProperties);
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
                stripFormat(schema);
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
        const schema = structuredClone(apiTool.body);
        stripFormat(schema);
        properties['body'] = schema;
        if (schemaIsRequired(apiTool.body, apiTool.defs ?? {})) {
            required.push('body');
        }
    }

    const inputSchema: InputSchema & {$defs?: Record<string, Schema>} = {type: 'object'};
    if (Object.keys(properties).length > 0) {
        inputSchema.properties = properties;
    }
    if (required.length > 0) {
        inputSchema.required = required;
    }
    if (Object.keys(apiTool.defs ?? {}).length > 0) {
        inputSchema.$defs = {};
        for (const [key, value] of Object.entries(apiTool.defs ?? {})) {
            const schema = structuredClone(value);
            stripFormat(schema);
            inputSchema.$defs[key] = schema;
        }
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
            case 'form': {
                if (param.explode) {
                    return paramValue.map(value => `${param.name}=${encodeURIComponent(value)}`).join('&');
                } else {
                    return `${param.name}=${paramValue.map(value => encodeURIComponent(value)).join(',')}`;
                }
            }
            case 'spaceDelimited': {
                return `${param.name}=${paramValue.map(value => encodeURIComponent(value)).join('%20')}`;
            }
            case 'pipeDelimited': {
                return `${param.name}=${paramValue.map(value => encodeURIComponent(value)).join('%7C')}`;
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
            case 'form': {
                if (param.explode) {
                    return Object.entries(paramValue).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
                } else {
                    return `${param.name}=${Object.entries(paramValue).map(([k, v]) => `${k},${encodeURIComponent(v)}`).join(',')}`;
                }
            }
            case 'spaceDelimited': {
                return `${param.name}=${Object.entries(paramValue).map(([k, v]) => `${k}%20${encodeURIComponent(v)}`).join('%20')}`;
            }
            case 'pipeDelimited': {
                return `${param.name}=${Object.entries(paramValue).map(([k, v]) => `${k}%7C${encodeURIComponent(v)}`).join('%7C')}`;
            }
            case 'deepObject': {
                return Object.entries(paramValue).map(([k, v]) => `${param.name}%5B${k}%5D=${encodeURIComponent(v)}`).join('&');
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
            case 'form': {
                return `${param.name}=${encodeURIComponent(`${paramValue}`)}`;
            }
            default:
                throw new Error('Unsupported style: ' + param.style);
        }
    }
};

const serializeContentParameter = (param: Parameter, paramValue: unknown): string | undefined => {
    if (paramValue === undefined || paramValue === null || 'schema' in param) return undefined;
    const mimeType = Object.keys(param.content)[0];
    if (Array.isArray(paramValue)) {
        if (mimeType === 'application/json') {
            return encodeURIComponent(JSON.stringify(paramValue));
        } else {
            return encodeURIComponent(paramValue.join(','));
        }
    } else if (typeof paramValue === 'object') {
        return encodeURIComponent(JSON.stringify(paramValue));
    } else {
        return encodeURIComponent(`${paramValue}`);
    }
};

export const serializeParameter = (param: Parameter, paramValue: unknown, isQuery: boolean = false): string | undefined => {
    if ('content' in param) {
        if (isQuery) {
            return `${param.name}=${serializeContentParameter(param, paramValue)}`;
        } else {
            return serializeContentParameter(param, paramValue);
        }
    } else {
        return serializeSchemaParameter(param, paramValue);
    }
};

export const buildUrlFromParameters = (url: string, parameters?: Parameter[], paramValues?: Record<string, unknown>): string => {
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

    if (paramValues === undefined) return url;

    const queryParams = parameters.filter(param => param.in === 'query' && param.name in paramValues);
    if (queryParams.length > 0) {
        url = `${url}?${queryParams.map(param => serializeParameter(param, paramValues[param.name], true)).join('&')}`;
    }

    return url;
};