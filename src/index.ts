import {Callback} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/callback.js';
import {Components} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/components.js';
import {Example} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/example.js';
import {Header} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/header.js';
import {Link} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/link.js';
import {MediaType} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/media-type.js';
import {OpenAPI} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/open-api.js';
import {Operation} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/operation.js';
import {Parameter} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/parameter.js';
import {PathItem} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/path-item.js';
import {Reference} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/reference.js';
import {RequestBody} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/request-body.js';
import {Response} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/response.js';
import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/schema.js';
import {SecurityRequirement} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/security-requirement.js';
import {SecurityScheme} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/security-scheme.js';
import {Server} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/server.js';
import {APIKeyAuth, APITool, BasicAuth, BearerAuth, MethodType, ToolAuth} from './types.js';

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

    let schema: SchemaObject;
    if (mediaType.schema.$ref) {
        const refValue = mediaType.schema.$ref.split('/').at(-1);
        if (refValue === undefined || components.schemas === undefined || !(refValue in components.schemas)) {
            throw new Error(`Invalid reference: ${mediaType.schema.$ref}`);
        }
        if (typeof components.schemas[refValue] === 'boolean') {
            return components.schemas[refValue];
        }
        schema = structuredClone(components.schemas[refValue]);
    } else {
        schema = structuredClone(mediaType.schema);
    }

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

export const operationToTool = (operationName: string, operation: Operation, pathName: string, pathParameters: (Parameter | Reference)[], pathServer: Server, topLevelSecurityRequirement: SecurityRequirement[], components: Components): APITool => {
    const name = generateToolName(pathName, operationName, operation.operationId);
    const description = operation.description || operation.summary || '';

    let server: Server;
    if (operation.servers) {
        server = operation.servers[0];
    } else {
        server = pathServer;
    }

    const apiTool: APITool = {
        description,
        method: operationName.toLowerCase() as MethodType,
        name,
        url: server.url + pathName,
    };

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

    if (allAuth.length > 0) {
        apiTool.auth = allAuth;
    }

    // Parameters
    const allParameters: Parameter[] = [];

    if (server.variables) {
        for (const varName of Object.keys(server.variables)) {
            const variable = server.variables[varName];
            allParameters.push(Parameter.parse({
                description: variable.description,
                in: 'path',
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

    if (allParameters.length > 0) {
        apiTool.params = allParameters;
    }

    // Body
    if (operation.requestBody) {
        let requestBody: RequestBody;
        if ('$ref' in operation.requestBody) {
            requestBody = resolveReference<RequestBody>(operation.requestBody.$ref, components);
        } else {
            requestBody = operation.requestBody;
        }

        // TODO: Support optional bodies (right now, they are requried if defined)
        if ('application/json' in requestBody.content) {
            const bodySchema = mediaTypeToJsonSchema(requestBody.content['application/json'], components);
            if (bodySchema !== undefined && typeof bodySchema !== 'boolean') {
                if (requestBody.description) {
                    bodySchema.description = requestBody.description;
                }
                apiTool.body = bodySchema;
                apiTool.contentType = 'application/json';
            }
        } else if ('application/x-www-form-urlencoded' in requestBody.content) {
            const bodySchema = mediaTypeToJsonSchema(requestBody.content['application/x-www-form-urlencoded'], components);
            if (bodySchema !== undefined && typeof bodySchema !== 'boolean') {
                if (requestBody.description) {
                    bodySchema.description = requestBody.description;
                }
                apiTool.body = bodySchema;
                apiTool.contentType = 'application/x-www-form-urlencoded';
            }
        }
    }

    const defs = updateToolAndGenerateDefs(allAuth, components);
    updateToolAndGenerateDefs(allParameters, components, defs);
    if (apiTool.body !== undefined) {
        updateToolAndGenerateDefs(apiTool.body, components, defs);
    }

    return {
        ...apiTool,
        defs,
    };
};

export const parseToolsFromSpec = (spec: OpenAPI): APITool[] => {
    if (spec.paths === undefined) return [];

    const topLevelServer = spec.servers[0];
    const topLevelSecurityRequirement = spec.security ? spec.security : [];
    const components = spec.components ? spec.components : {};

    const tools: APITool[] = [];

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