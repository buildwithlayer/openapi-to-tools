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

export const serializeParameter = (param: Parameter, paramValue: string | string[] | object): string => {
    // TODO: implement this
};

export const buildUrlFromParameters = (url: string, parameters?: Parameter[], paramValues?: Record<string, string | string[] | object>): string => {
    if (parameters === undefined || parameters.length === 0) {
        return url;
    }

    const pathParams: (Parameter & {in: 'path'})[] = parameters.filter(param => param.in === 'path');
    for (const param of pathParams) {
        if (paramValues === undefined || !(param.name in paramValues)) continue;
        url = url.replace(`{${param.name}`, serializeParameter(param, paramValues[param.name]));
    }

    const matrixParams = parameters.filter(param => ('style' in param && param.style === 'matrix'));

    const

    const matrixParams: Parameter[] = [];
    const labelParams: Parameter[] = [];
    const simpleParams: Parameter[] = [];
    const otherParams: Parameter[] = [];

    for (const param of parameters) {
        switch (param.in) {
            case 'path': {
                pathParams.push(param);
                break;
            }
            case 'query': {
                if ('content' in param) {
                    otherParams.push(param);
                } else {
                    switch (param.style) {
                        case 'matrix': {
                            matrixParams.push(param);
                            break;
                        }
                        case 'label': {
                            labelParams.push(param);
                            break;
                        }
                        case 'simple': {
                            simpleParams.push(param);
                            break;
                        }
                        default: {
                            otherParams.push(param);
                            break;
                        }
                    }
                }
            }
        }
    }

    for (const param of pathParams) {
        const paramValue = paramValues?.[param.name];

        let replacement: string = '';
        if ('content' in param) {
            if (paramValue !== undefined) {
                const mimeType = Object.keys(param.content)[0];

                // TODO: support other MIME types
                if (mimeType === 'application/json' && (Array.isArray(paramValue) || typeof paramValue === 'object')) {
                    replacement = JSON.stringify(paramValue);
                } else {
                    replacement = paramValue;
                }
                replacement = encodeURIComponent(replacement);
            }
        } else {
            switch (param.style) {
                case 'matrix': {
                    if (paramValue === undefined) {
                        replacement = `;${param.name}`;
                        break;
                    }
                    if (Array.isArray(paramValue)) {
                        if (param.explode) {

                        }
                    }
                }
            }
        }
    }

    const builtUrl;
};