import {Callback} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/callback';
import {Components} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/components';
import {Example} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/example';
import {Header} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/header';
import {Link} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/link';
import {MediaType} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/media-type';
import {OpenAPI} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/open-api';
import {Operation} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/operation';
import {Parameter} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/parameter';
import {PathItem} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/path-item';
import {Reference} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/reference';
import {RequestBody} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/request-body';
import {Response} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/response';
import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/schema';
import {SecurityRequirement} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/security-requirement';
import {SecurityScheme} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/security-scheme';
import {Server} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/server';
import {ToolSchema} from '@modelcontextprotocol/sdk/types.js';
import {z} from 'zod';
import {APIKeyAuth, BasicAuth, BearerAuth, ToolAuth} from './types';

type ToolSchema = z.infer<typeof ToolSchema>;

export interface ToolInfo {
    method: string;
    schema: ToolSchema;
    url: string;
}

type ResolvedReference =
    Callback
    | Example
    | Header
    | Link
    | Parameter
    | PathItem
    | RequestBody
    | Response
    | Schema
    | SecurityScheme;

export const resolveReference = <T extends ResolvedReference>(refPath: string, components: Components): T => {
    const parts = refPath.split('/').slice(2);
    if (!(parts[0] in components)) {
        throw new Error(`Invalid reference ${refPath}`);
    }

    const componentsKey = parts[0] as keyof typeof components;
    const componentsField = components[componentsKey];
    if (componentsField === undefined) {
        throw new Error(`Invalid reference ${refPath}`);
    }

    const objOrRef = componentsField[parts[1]];
    if (objOrRef === undefined) {
        throw new Error(`Invalid reference ${refPath}`);
    } else if (typeof objOrRef === 'boolean') {
        return structuredClone(objOrRef) as T;
    } else if ('$ref' in objOrRef && typeof objOrRef.$ref === 'string') {
        return resolveReference<T>(objOrRef.$ref, components);
    } else {
        return structuredClone(objOrRef) as T;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateToolAndGenerateDefs = (obj: any, components: Components, currentDefs?: Record<string, Schema>) => {
    if (currentDefs === undefined) {
        currentDefs = {};
    }

    if (Array.isArray(obj)) {
        for (const item of obj) {
            updateToolAndGenerateDefs(item, components, currentDefs);
        }
    } else if (typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            if (key === '$ref') {
                const parts = (value as string).split('/').slice(2);
                const currentDefsKey = parts.at(-1);
                obj[key] = `#/$defs/${currentDefsKey}`;

                if (currentDefsKey === undefined || currentDefsKey in currentDefs) {
                    continue;
                }

                const resolvedRef = resolveReference<Schema>(value as string, components);
                currentDefs[currentDefsKey] = resolvedRef;
                updateToolAndGenerateDefs(resolvedRef, components, currentDefs);
            } else {
                updateToolAndGenerateDefs(value, components, currentDefs);
            }
        }
    }

    return currentDefs;
};

export const mediaTypeToJsonSchema = (mediaType: MediaType, components: Components): Schema | undefined => {
    if (mediaType.schema === undefined) return undefined;

    if (typeof mediaType.schema === 'boolean') {
        return mediaType.schema;
    }

    const schema = structuredClone(mediaType.schema);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const examples: any[] = [];
    if (mediaType.example) {
        examples.push(mediaType.example);
    }
    if (mediaType.examples) {
        for (const eg of Object.values(mediaType.examples)) {
            let example: Example;
            if ('$ref' in eg) {
                example = resolveReference<Example>(eg.$ref, components);
            } else {
                example = eg;
            }
            if (example.value) {
                examples.push(example.value);
            }
        }
    }

    if (examples.length > 0) {
        schema.examples = examples;
    }

    return schema;
};

export const generateToolName = (pathName: string, operationName: string, operationId?: string): string => {
    let name: string;
    if (operationId) {
        name = operationId;
    } else {
        name = `${operationName}_${pathName}`;
    }
    name = name.replace(/[^a-zA-Z0-9_]/, '');
    return name.slice(0, 64);
};

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

export const operationToTool = (operationName: string, operation: Operation, pathName: string, pathParameters: (Parameter | Reference)[], pathServer: Server, topLevelSecurityRequirement: SecurityRequirement[], components: Components): ToolInfo => {
    const name = generateToolName(pathName, operationName, operation.operationId);
    const description = operation.description || operation.summary || '';

    let server: Server;
    if (operation.servers) {
        server = operation.servers[0];
    } else {
        server = pathServer;
    }

    // Auth
    const allSecurityRequirements = topLevelSecurityRequirement.map(req => ({...req}));
    if (operation.security) {
        allSecurityRequirements.push(...operation.security.map(req => ({...req})));
    }

    const allAuth: ToolAuth[] = [];

    for (const securityRequirement of allSecurityRequirements) {
        if (Object.keys(securityRequirement).length === 0) continue;
        for (const securityName of Object.keys(securityRequirement)) {
            const securityScheme = resolveReference<SecurityScheme>(`#/components/securitySchemes/${securityName}`, components);
            if (securityScheme.type === 'apiKey') {
                allAuth.push({
                    description: securityScheme.description,
                    in: securityScheme.in,
                    key: securityName,
                    name: securityScheme.name,
                    type: 'apiKey',
                } as APIKeyAuth);
            } else if (securityScheme.type === 'http') {
                if (securityScheme.scheme === 'bearer') {
                    allAuth.push({
                        bearerFormat: securityScheme.bearerFormat,
                        description: securityScheme.description,
                        key: securityName,
                        scheme: 'bearer',
                        type: 'http',
                    } as BearerAuth);
                } else if (securityScheme.scheme === 'basic') {
                    allAuth.push({
                        description: securityScheme.description,
                        key: securityName,
                        scheme: 'basic',
                        type: 'http',
                    } as BasicAuth);
                }
            }
        }
    }

    // Parameters
    const allParameters: Parameter[] = [];

    if (server.variables) {
        for (const varName of Object.keys(server.variables)) {
            const variable = server.variables[varName];
            allParameters.push(Parameter.parse({
                description: variable.description,
                name: varName,
                required: true,
                schema: Schema.parse({
                    default: variable.default,
                    description: variable.description,
                    enum: variable.enum,
                    type: 'string',
                }),
            }));
        }
    }

    const paramRequirements = structuredClone(pathParameters);
    if (operation.parameters) {
        paramRequirements.push(...structuredClone(operation.parameters));
    }

    for (const paramOrRef of paramRequirements) {
        let param: Parameter;
        if ('$ref' in paramOrRef) {
            param = resolveReference<Parameter>(paramOrRef.$ref, components);
        } else {
            param = paramOrRef;
        }

        if (param.in === 'cookie' || 'content' in param) continue;

        allParameters.push(param);
    }

    // Body
    let body: Schema | undefined = undefined;
    if (operation.requestBody) {
        let requestBody: RequestBody;
        if ('$ref' in operation.requestBody) {
            requestBody = resolveReference<RequestBody>(operation.requestBody.$ref, components);
        } else {
            requestBody = operation.requestBody;
        }

        if ('application/json' in requestBody.content) {
            const bodySchema = mediaTypeToJsonSchema(requestBody.content['application/json'], components);
            if (bodySchema !== undefined && typeof bodySchema !== 'boolean') {
                if (requestBody.description) {
                    bodySchema.description = requestBody.description;
                }
                body = bodySchema;
            }
        } else if ('application/x-www-form-urlencoded' in requestBody.content) {
            const bodySchema = mediaTypeToJsonSchema(requestBody.content['application/x-www-form-urlencoded'], components);
            if (bodySchema !== undefined && typeof bodySchema !== 'boolean') {
                if (requestBody.description) {
                    bodySchema.description = requestBody.description;
                }
                body = bodySchema;
            }
        }
    }

    const defs = updateToolAndGenerateDefs(allAuth, components);
    updateToolAndGenerateDefs(allParameters, components);
    if (body !== undefined) {
        updateToolAndGenerateDefs(body, components);
    }

    const properties: SchemaObject['properties'] = {};
    const required: string[] = [];

    if (allAuth.length > 0) {
        const authProperties: SchemaObject['properties'] = {};
        const authRequired: string[] = [];

        for (const auth of allAuth) {
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

    if (allParameters.length > 0) {
        const paramProperties: SchemaObject['properties'] = {};
        const paramRequired: string[] = [];

        for (const param of allParameters) {
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

    if (body !== undefined) {
        properties['body'] = body;
        if (schemaIsRequired(body, defs)) {
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
    if (Object.keys(defs).length > 0) {
        inputSchema.$defs = defs;
    }

    return {
        method: operationName,
        schema: {
            description,
            inputSchema,
            name,
        },
        url: server.url + pathName,
    };
};

export const parseToolsFromSpec = (spec: OpenAPI): ToolInfo[] => {
    if (spec.paths === undefined) return [];

    const topLevelServer = spec.servers[0];
    const topLevelSecurityRequirement = spec.security ? spec.security : [];
    const components = spec.components ? spec.components : {};

    const tools: ToolInfo[] = [];

    for (const pathName of Object.keys(spec.paths)) {
        let path = spec.paths[pathName];
        if (path.$ref) {
            const pathRef = resolveReference<PathItem>(path.$ref, components);
            path = {
                ...path,
                ...pathRef,
            };
        }

        let pathServer: Server;
        if (path.servers) {
            pathServer = path.servers[0];
        } else {
            pathServer = topLevelServer;
        }

        const pathParameters: (Parameter | Reference)[] = [];
        if (path.parameters) {
            pathParameters.push(...path.parameters);
        }

        for (const operationName of ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']) {
            const operationObj = path[operationName as keyof typeof path];
            if (operationObj === undefined) continue;

            tools.push(operationToTool(
                operationName.toUpperCase(),
                operationObj as Operation,
                pathName,
                pathParameters,
                pathServer,
                topLevelSecurityRequirement,
                components,
            ));
        }
    }

    return tools;
};