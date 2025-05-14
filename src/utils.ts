import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/schema.js';
import {ToolSchema} from '@modelcontextprotocol/sdk/types.js';
import {z} from 'zod';
import {APITool} from './types.js';

export type ToolSchema = z.infer<typeof ToolSchema>;

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

    return false;
};

export const apiToolToInputSchema = (apiTool: APITool): ToolSchema['inputSchema'] => {
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
    }

    if (apiTool.params && apiTool.params.length > 0) {
        const paramProperties: SchemaObject['properties'] = {};
        const paramRequired: string[] = [];

        for (const param of apiTool.params) {
            if ('schema' in param) {
                paramProperties[param.name] = param.schema;
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
    }

    if (apiTool.body) {
        properties['body'] = apiTool.body;
        if (schemaIsRequired(apiTool.body, apiTool.defs ?? {})) {
            required.push('body');
        }
    }

    const inputSchema: ToolSchema['inputSchema'] = {type: 'object'};
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