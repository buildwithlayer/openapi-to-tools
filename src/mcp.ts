import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {RequestHandlerExtra} from '@modelcontextprotocol/sdk/shared/protocol.js';
import {
    CallToolRequest,
    CallToolRequestSchema,
    CallToolResult,
    ErrorCode,
    ListToolsRequest,
    ListToolsRequestSchema,
    ListToolsResult,
    McpError,
    Notification,
    Request,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';
import {Ajv} from 'ajv';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {APITool, InputSchema, Overrides} from './types.js';
import {apiToolToInputSchema} from './utils.js';

export class LayerOpenAPIPlugin {
    protected ajv: Ajv;
    protected apiTools: { [name: string]: APITool } = {};
    protected apiToolSchemas: { [name: string]: InputSchema } = {};
    protected originalCallToolRequestHandler?: (request: CallToolRequest, extra: RequestHandlerExtra<Request, Notification>) => CallToolResult | Promise<CallToolResult>;
    protected originalListToolsRequestHandler?: (request: ListToolsRequest, extra: RequestHandlerExtra<Request, Notification>) => ListToolsResult | Promise<ListToolsResult>;

    constructor(
        apiTools: APITool[],
        originalCallToolRequestHandler: (request: CallToolRequest, extra: RequestHandlerExtra<Request, Notification>) => CallToolResult | Promise<CallToolResult>,
        originalListToolsRequestHandler: (request: ListToolsRequest, extra: RequestHandlerExtra<Request, Notification>) => ListToolsResult | Promise<ListToolsResult>,
        overrides: Overrides = {},
    ) {
        this.ajv = new Ajv({useDefaults: true});
        apiTools.forEach(apiTool => {
            this.apiTools[apiTool.name] = apiTool;
            this.apiToolSchemas[apiTool.name] = apiToolToInputSchema(apiTool, overrides);
        });
        this.originalCallToolRequestHandler = originalCallToolRequestHandler;
        this.originalListToolsRequestHandler = originalListToolsRequestHandler;
    }

    protected async callApiToolRequestHandler(request: CallToolRequest): Promise<CallToolResult> {
        const apiTool = this.apiTools[request.params.name];
        const inputSchema = this.apiToolSchemas[request.params.name];
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
        const queryParams: Record<string, any> = {};
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
                    queryParams[paramName] = paramValue;
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
                    headers[toolAuth.name] = authValue as string;
                }
            }
        }

        const body = request.params.arguments?.body;

        const axiosRequestConfig: AxiosRequestConfig = {
            headers,
            method: apiTool.method,
            url,
            paramsSerializer: params => {
            // THIS IS COPILOT CODE, PLEASE REVIEW BEFORE MERGING
            // Custom serializer to handle arrays correctly
            return Object.entries(params)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        // For arrays, return each value with the same key
                        return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
                    }
                    return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
                })
                .join('&');
            }
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

    callToolRequestHandler(request: CallToolRequest, extra: RequestHandlerExtra<Request, Notification>): CallToolResult | Promise<CallToolResult> {
        if (this.originalCallToolRequestHandler === undefined || request.params.name in this.apiTools) {
            return this.callApiToolRequestHandler(request);
        } else {
            return this.originalCallToolRequestHandler(request, extra);
        }
    };

    listToolsRequestHandler(request: ListToolsRequest, extra: RequestHandlerExtra<Request, Notification>): ListToolsResult | Promise<ListToolsResult> {
        const listApiToolsResult = Object.entries(this.apiTools)
            .map(([name, tool]): Tool => {
                return {
                    description: tool.description,
                    inputSchema: this.apiToolSchemas[name],
                    name,
                };
            });

        if (this.originalListToolsRequestHandler === undefined) {
            return {
                tools: listApiToolsResult,
            };
        }

        const original = this.originalListToolsRequestHandler(request, extra);
        return Promise.resolve(original)
            .then(result => {
                return {
                    ...result,
                    tools: [...result.tools, ...listApiToolsResult],
                };
            });
    };

}

interface LayerServer extends McpServer {
    _layerOpenAPIPlugin: LayerOpenAPIPlugin;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function addAPIToolsPlugin(server: McpServer, apiTools: APITool[], overrides: Overrides = {}) {
    (server as any).setToolRequestHandlers();

    const plugin = new LayerOpenAPIPlugin(
        apiTools,
        (server as any).server._requestHandlers.get(CallToolRequestSchema.shape.method.value),
        (server as any).server._requestHandlers.get(ListToolsRequestSchema.shape.method.value),
        overrides,
    );
    (server as LayerServer)._layerOpenAPIPlugin = plugin;

    (server as any).server.setRequestHandler(CallToolRequestSchema, (request: CallToolRequest, extra: RequestHandlerExtra<Request, Notification>) => plugin.callToolRequestHandler(request, extra));
    (server as any).server.setRequestHandler(ListToolsRequestSchema, (request: ListToolsRequest, extra: RequestHandlerExtra<Request, Notification>) => plugin.listToolsRequestHandler(request, extra));

    (server as LayerServer).sendToolListChanged();
}
