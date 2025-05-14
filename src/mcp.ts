import {type ServerOptions} from '@modelcontextprotocol/sdk/server/index.js';
import {McpServer, RegisteredTool, ToolCallback} from '@modelcontextprotocol/sdk/server/mcp.js';
import {
    CallToolRequest, CallToolRequestSchema,
    CallToolResult,
    ErrorCode,
    Implementation, ListToolsRequestSchema,
    ListToolsResult,
    McpError,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';
import {Ajv} from 'ajv';
import axios, {AxiosRequestConfig} from 'axios';
import {ZodRawShape} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';
import {APITool} from './types.js';
import {apiToolToInputSchema, type ToolSchema} from './utils.js';

export type LayerServerOptions = ServerOptions & {
    apiTools: APITool[];
}

export default class LayerMcpServer extends McpServer {
    private readonly ajv = new Ajv({useDefaults: true});
    private _apiTools: { [name: string]: APITool } = {};
    private _apiToolSchemas: { [name: string]: ToolSchema['inputSchema'] } = {};

    constructor(serverInfo: Implementation, options?: LayerServerOptions) {
        super(serverInfo, options);
        for (const apiTool of options?.apiTools ?? []) {
            this._apiTools[apiTool.name] = apiTool;
        }

        this.listToolsRequestHandler = this.listToolsRequestHandler.bind(this);
        this.callApiToolRequestHandler = this.callApiToolRequestHandler.bind(this);
        this.callRegisteredToolRequestHandler = this.callRegisteredToolRequestHandler.bind(this);
        this.callToolRequestHandler = this.callToolRequestHandler.bind(this);
        this.overrideToolRequestHandlers = this.overrideToolRequestHandlers.bind(this);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).setToolRequestHandlers = () => this.overrideToolRequestHandlers();
    }

    private listToolsRequestHandler(): ListToolsResult {
        const listRegisteredToolsResult: ListToolsResult['tools'] = Object.entries(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }

    private async callApiToolRequestHandler(request: CallToolRequest): Promise<CallToolResult> {
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

        const url = apiTool.url;

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
                    url.replace(`{${paramName}}`, paramValue as string);
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

        return axios.request(axiosRequestConfig)
            .then(response => {
                return {
                    content: [
                        {
                            text: JSON.stringify(response.data),
                            type: 'text' as const,
                        },
                    ],
                    isError: false,
                };
            })
            .catch(error => {
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
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async callRegisteredToolRequestHandler(request: CallToolRequest, extra: any): Promise<CallToolResult> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async callToolRequestHandler(request: CallToolRequest, extra: any): Promise<CallToolResult> {
        if (request.params.name in this._apiTools) {
            return this.callApiToolRequestHandler(request);
        } else {
            return this.callRegisteredToolRequestHandler(request, extra);
        }
    }

    private overrideToolRequestHandlers() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)._toolHandlersInitialized = true;
    }
}