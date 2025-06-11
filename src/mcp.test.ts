import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {InMemoryTransport} from '@modelcontextprotocol/sdk/inMemory.js';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {ListToolsResultSchema} from '@modelcontextprotocol/sdk/types.js';
import addAPIToolsPlugin from './mcp.js';

describe('adding tools to servers', () => {
    test('No previous tools, no future tools, no apiTools', () => {
        const server = new McpServer(
            {
                name: 'test-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            },
        );
        addAPIToolsPlugin(server, []);
    });

    test('No previous tools, no future tools, apiTools', async () => {
        const server = new McpServer(
            {
                name: 'test-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            },
        );
        addAPIToolsPlugin(server, [{
            description: 'Calls an api to get a cat image',
            method: 'get',
            name: 'getCatImage',
            url: 'https://api.thecatapi.com/v1/images/search',
        }]);

        const client = new Client({
            name: 'test client',
            version: '1.0',
        });

        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
        await Promise.all([
            client.connect(clientTransport),
            server.connect(serverTransport),
        ]);

        const result = await client.request(
            {
                method: 'tools/list',
            },
            ListToolsResultSchema,
        );

        expect(result.tools).toHaveLength(1);
        expect(result.tools[0].name).toBe('getCatImage');
        expect(result.tools[0].description).toBe('Calls an api to get a cat image');
        expect(result.tools[0].inputSchema).toEqual({type: 'object'});
    });

    test('Previous tools, no future tools, apiTools', async () => {
        const server = new McpServer(
            {
                name: 'test-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            },
        );

        server.tool('test', async () => ({
            content: [
                {
                    text: 'Text response',
                    type: 'text',
                },
            ],
        }));

        addAPIToolsPlugin(server, [{
            description: 'Calls an api to get a cat image',
            method: 'get',
            name: 'getCatImage',
            url: 'https://api.thecatapi.com/v1/images/search',
        }]);

        const client = new Client({
            name: 'test client',
            version: '1.0',
        });

        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
        await Promise.all([
            client.connect(clientTransport),
            server.connect(serverTransport),
        ]);

        const result = await client.request(
            {
                method: 'tools/list',
            },
            ListToolsResultSchema,
        );

        expect(result.tools).toHaveLength(2);
        expect(result.tools[0].name).toBe('test');
        expect(result.tools[0].inputSchema).toEqual({type: 'object'});
        expect(result.tools[1].name).toBe('getCatImage');
        expect(result.tools[1].description).toBe('Calls an api to get a cat image');
        expect(result.tools[1].inputSchema).toEqual({type: 'object'});
    });

    test('No previous tools, future tools, apiTools', async () => {
        const server = new McpServer(
            {
                name: 'test-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            },
        );

        addAPIToolsPlugin(server, [{
            description: 'Calls an api to get a cat image',
            method: 'get',
            name: 'getCatImage',
            url: 'https://api.thecatapi.com/v1/images/search',
        }]);

        server.tool('test', async () => ({
            content: [
                {
                    text: 'Text response',
                    type: 'text',
                },
            ],
        }));

        const client = new Client({
            name: 'test client',
            version: '1.0',
        });

        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
        await Promise.all([
            client.connect(clientTransport),
            server.connect(serverTransport),
        ]);

        const result = await client.request(
            {
                method: 'tools/list',
            },
            ListToolsResultSchema,
        );

        expect(result.tools).toHaveLength(2);
        expect(result.tools[0].name).toBe('test');
        expect(result.tools[0].inputSchema).toEqual({type: 'object'});
        expect(result.tools[1].name).toBe('getCatImage');
        expect(result.tools[1].description).toBe('Calls an api to get a cat image');
        expect(result.tools[1].inputSchema).toEqual({type: 'object'});
    });

    test('Previous tools, future tools, apiTools', async () => {
        const server = new McpServer(
            {
                name: 'test-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            },
        );

        server.tool('test1', async () => ({
            content: [
                {
                    text: 'Text response',
                    type: 'text',
                },
            ],
        }));

        addAPIToolsPlugin(server, [{
            description: 'Calls an api to get a cat image',
            method: 'get',
            name: 'getCatImage',
            url: 'https://api.thecatapi.com/v1/images/search',
        }]);

        server.tool('test2', async () => ({
            content: [
                {
                    text: 'Text response',
                    type: 'text',
                },
            ],
        }));

        const client = new Client({
            name: 'test client',
            version: '1.0',
        });

        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
        await Promise.all([
            client.connect(clientTransport),
            server.connect(serverTransport),
        ]);

        const result = await client.request(
            {
                method: 'tools/list',
            },
            ListToolsResultSchema,
        );

        expect(result.tools).toHaveLength(3);
        expect(result.tools[0].name).toBe('test1');
        expect(result.tools[0].inputSchema).toEqual({type: 'object'});
        expect(result.tools[1].name).toBe('test2');
        expect(result.tools[1].inputSchema).toEqual({type: 'object'});
        expect(result.tools[2].name).toBe('getCatImage');
        expect(result.tools[2].description).toBe('Calls an api to get a cat image');
        expect(result.tools[2].inputSchema).toEqual({type: 'object'});
    });
});

test('Invalid parameters response', async () => {
    const server = new McpServer(
        {
            name: 'test-server',
            version: '1.0.0',
        },
        {
            capabilities: {
                tools: {},
            },
        },
    );
    addAPIToolsPlugin(server, [{
        description: 'Calls an api to get a cat image',
        method: 'get',
        name: 'getCatImage',
        params: [
            {
                description: 'The number of pictures to return',
                in: 'query',
                name: 'count',
                required: true,
                schema: {
                    default: 1,
                    exclusiveMaximum: 100,
                    exclusiveMinimum: 0,
                    type: 'number',
                },
                style: 'form',
            },
        ],
        url: 'https://api.thecatapi.com/v1/images/search',
    }]);

    const client = new Client({
        name: 'test client',
        version: '1.0',
    });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport),
    ]);

    await expect(client.callTool({
        arguments: {},
        name: 'getCatImage',
    })).resolves.toBeDefined();

    await expect(client.callTool({
        arguments: {
            params: {
                count: 0,
            },
        },
        name: 'getCatImage',
    })).rejects.toBeDefined();
});