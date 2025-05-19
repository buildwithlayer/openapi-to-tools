import {McpServer, RegisteredTool, ToolCallback} from '@modelcontextprotocol/sdk/server/mcp.js';
import {
    CallToolRequest,
    CallToolRequestSchema,
    CallToolResult,
    ErrorCode,
    ListToolsRequestSchema,
    ListToolsResult,
    McpError,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';
import {Ajv} from 'ajv';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {ZodRawShape} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';
import {APITool} from './types.js';
import {apiToolToInputSchema, type ToolSchema} from './utils.js';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface LayerServer extends McpServer {
    _apiTools: { [name: string]: APITool };
    _apiToolSchemas: { [name: string]: ToolSchema['inputSchema'] };
    ajv: Ajv;
    callApiToolRequestHandler(request: CallToolRequest): Promise<CallToolResult>;
    callRegisteredToolRequestHandler(request: CallToolRequest, extra: any): Promise<CallToolResult>;
    callToolRequestHandler(request: CallToolRequest, extra: any): Promise<CallToolResult>;
    listToolsRequestHandler(): ListToolsResult;
    overrideToolRequestHandlers(): void;
}

export function addAPITools(server: unknown, apiTools: APITool[] | undefined) {
    (server as LayerServer).ajv = new Ajv({useDefaults: true});
    (server as LayerServer)._apiTools = {};
    for (const apiTool of apiTools ?? []) {
        (server as LayerServer)._apiTools[apiTool.name] = apiTool;
    }
    (server as LayerServer)._apiToolSchemas = {};

    (server as LayerServer).listToolsRequestHandler = function (): ListToolsResult {
        const listRegisteredToolsResult: ListToolsResult['tools'] = Object.entries(
            (this as any)._registeredTools as ({ [name: string]: RegisteredTool }),
        ).filter(([, tool]) => tool.enabled)
            .map(([name, tool]): Tool => {
                return {
                    annotations: tool.annotations,
                    description: tool.description,
                    inputSchema: tool.inputSchema
                        ? (zodToJsonSchema(tool.inputSchema, {
                            strictUnions: true,
                        }) as Tool['inputSchema'])
                        : {
                            type: 'object' as const,
                        },
                    name,
                };
            });
        const listApiToolsResult: ListToolsResult['tools'] = Object.entries(this._apiTools)
            .map(([name, tool]): Tool => {
                const inputSchema = apiToolToInputSchema(tool);
                this._apiToolSchemas[name] = inputSchema;
                return {
                    description: tool.description,
                    inputSchema: inputSchema,
                    name,
                };
            });
        return {
            tools: [...listRegisteredToolsResult, ...listApiToolsResult],
        };
    };
    (server as LayerServer).listToolsRequestHandler = (server as LayerServer).listToolsRequestHandler.bind(server);

    (server as LayerServer).callApiToolRequestHandler = async function (request: CallToolRequest): Promise<CallToolResult> {
        const apiTool = this._apiTools[request.params.name];
        const inputSchema = this._apiToolSchemas[request.params.name];
        if (!apiTool || !inputSchema) {
            throw new McpError(
                ErrorCode.InvalidParams,
                `Tool ${request.params.name} not found`,
            );
        }

        const validate = this.ajv.compile(inputSchema);
        if (!validate(request.params.arguments)) {
            throw new McpError(
                ErrorCode.InvalidParams,
                `Invalid arguments for tool ${request.params.name}: ${JSON.stringify(validate.errors)}`,
            );
        }

        let url = apiTool.url;

        const headers: Record<string, string> = {};
        const queryParams: Record<string, string> = {};
        const params = request.params.arguments?.params;
        if (params) {
            if (apiTool.params === undefined) {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `Tool ${request.params.name} does not support parameters`,
                );
            }

            for (const [paramName, paramValue] of Object.entries(params)) {
                const param = apiTool.params.find(p => p.name === paramName);
                if (param === undefined) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Tool ${request.params.name} does not support parameter ${paramName}`,
                    );
                }

                if (param.in === 'header') {
                    headers[paramName] = paramValue as string;
                } else if (param.in === 'path') {
                    url = url.replace(`{${paramName}}`, paramValue as string);
                } else if (param.in === 'query') {
                    queryParams[paramName] = paramValue as string;
                }
            }
        }

        const auth = request.params.arguments?.auth;
        if (auth) {
            if (apiTool.auth === undefined) {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `Tool ${request.params.name} does not support authentication`,
                );
            }

            for (const [authName, authValue] of Object.entries(auth)) {
                const toolAuth = apiTool.auth.find(a => a.key === authName);
                if (toolAuth === undefined) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Tool ${request.params.name} does not support authentication ${authName}`,
                    );
                }

                if (toolAuth.type === 'http' && toolAuth.scheme === 'bearer') {
                    headers['Authorization'] = `Bearer ${authValue as string}`;
                } else if (toolAuth.type === 'http' && toolAuth.scheme === 'basic') {
                    headers['Authorization'] = `Basic ${authValue as string}`;
                } else if (toolAuth.type === 'apiKey') {
                    // TODO: Support cookie + query
                    headers[toolAuth.key] = authValue as string;
                }
            }
        }

        const body = request.params.arguments?.body;

        const axiosRequestConfig: AxiosRequestConfig = {
            headers,
            method: apiTool.method,
            url,
        };

        if (Object.keys(queryParams).length > 0) {
            axiosRequestConfig.params = queryParams;
        }

        if (body) {
            axiosRequestConfig.data = body;
        }

        try {
            const response = await axios.request(axiosRequestConfig);
            return {
                content: [
                    {
                        text: JSON.stringify(response.data),
                        type: 'text' as const,
                    },
                ],
                isError: false,
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return {
                        content: [
                            {
                                text: JSON.stringify(error.response.data, null, 2),
                                type: 'text',
                            },
                        ],
                        isError: true,
                    };
                } else if (error.request) {
                    console.error(error.request);
                    return {
                        content: [
                            {
                                text: 'Failed to complete API request',
                                type: 'text',
                            },
                        ],
                        isError: true,
                    };
                } else {
                    console.error(error.message);
                    return {
                        content: [
                            {
                                text: 'Failed to complete API request',
                                type: 'text',
                            },
                        ],
                        isError: true,
                    };
                }
            }
            console.error(error);
            return {
                content: [
                    {
                        text: 'Failed to complete API request',
                        type: 'text',
                    },
                ],
                isError: true,
            };
        }
    };
    (server as LayerServer).callApiToolRequestHandler = (server as LayerServer).callApiToolRequestHandler.bind(server);

    (server as LayerServer).callRegisteredToolRequestHandler = async function (request: CallToolRequest, extra: any): Promise<CallToolResult> {
        const tool: RegisteredTool | undefined = (this as any)._registeredTools[request.params.name];
        if (!tool) {
            throw new McpError(
                ErrorCode.InvalidParams,
                `Tool ${request.params.name} not found`,
            );
        }

        if (!tool.enabled) {
            throw new McpError(
                ErrorCode.InvalidParams,
                `Tool ${request.params.name} disabled`,
            );
        }

        if (tool.inputSchema) {
            const parseResult = await tool.inputSchema.safeParseAsync(
                request.params.arguments,
            );
            if (!parseResult.success) {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `Invalid arguments for tool ${request.params.name}: ${parseResult.error.message}`,
                );
            }

            const args = parseResult.data;
            const cb = tool.callback as ToolCallback<ZodRawShape>;
            try {
                return cb(args, extra);
            } catch (error) {
                return {
                    content: [
                        {
                            text: error instanceof Error ? error.message : String(error),
                            type: 'text',
                        },
                    ],
                    isError: true,
                };
            }
        } else {
            const cb = tool.callback as ToolCallback<undefined>;
            try {
                return cb(extra);
            } catch (error) {
                return {
                    content: [
                        {
                            text: error instanceof Error ? error.message : String(error),
                            type: 'text',
                        },
                    ],
                    isError: true,
                };
            }
        }
    };
    (server as LayerServer).callRegisteredToolRequestHandler = (server as LayerServer).callRegisteredToolRequestHandler.bind(server);

    (server as LayerServer).callToolRequestHandler = async function (request: CallToolRequest, extra: any): Promise<CallToolResult> {
        if (request.params.name in this._apiTools) {
            return this.callApiToolRequestHandler(request);
        } else {
            return this.callRegisteredToolRequestHandler(request, extra);
        }
    };
    (server as LayerServer).callToolRequestHandler = (server as LayerServer).callToolRequestHandler.bind(server);

    (server as LayerServer).overrideToolRequestHandlers = function () {
        if ((this as any)._toolHandlersInitialized) return;

        this.server.assertCanSetRequestHandler(ListToolsRequestSchema.shape.method.value);
        this.server.assertCanSetRequestHandler(CallToolRequestSchema.shape.method.value);

        this.server.registerCapabilities({
            tools: {
                listChanged: true,
            },
        });

        this.server.setRequestHandler(ListToolsRequestSchema, this.listToolsRequestHandler);
        this.server.setRequestHandler(CallToolRequestSchema, this.callToolRequestHandler);

        (this as any)._toolHandlersInitialized = true;
    };
    (server as LayerServer).overrideToolRequestHandlers = (server as LayerServer).overrideToolRequestHandlers.bind(server);

    (server as any).setToolRequestHandlers = () => (server as LayerServer).overrideToolRequestHandlers();
}
