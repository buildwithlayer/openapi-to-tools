import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/schema.js';
import {APITool} from './types.js';
import {apiToolToInputSchema} from './utils.js';

describe('apiToolToInputSchema', () => {
    const tool: APITool = {
        defs: {},
        description: 'Get all bookings',
        method: 'get',
        name: 'getBookings',
        params: [
            {
                description: 'Must be set to 2024-08-13',
                explode: false,
                in: 'header',
                name: 'cal-api-version',
                required: true,
                schema: {
                    default: '2024-08-13',
                    type: 'string',
                },
                style: 'simple',
            },
            {
                description: 'The number of items to skip',
                example: 0,
                explode: true,
                in: 'query',
                name: 'skip',
                required: false,
                schema: {
                    default: 0,
                    type: 'number',
                },
                style: 'form',
            },
            {
                description:
                    'value must be `Bearer <token>` where `<token>` is api key prefixed with cal_ or managed user access token',
                explode: false,
                in: 'header',
                name: 'Authorization',
                required: true,
                schema: {
                    type: 'string',
                },
                style: 'simple',
            },
        ],
        url: 'https://api.cal.com/v2/bookings',
    };

    test('no overrides', () => {
        const inputSchema = apiToolToInputSchema(tool, {});
        const {params}: Record<string, Schema> = (inputSchema as SchemaObject).properties ?? {};
        if (params === undefined || typeof params === 'boolean') {
            fail('params is not a SchemaObject');
        }

        const {properties} = params;
        if (properties === undefined) {
            fail('properties is not defined');
        }

        const {'Authorization': authorization, 'cal-api-version': calApiVersion} = properties;
        if (typeof authorization !== 'object') {
            fail('Authorization is not a SchemaObject');
        }
        if (typeof calApiVersion !== 'object') {
            fail('cal-api-version is not a SchemaObject');
        }

        expect(authorization.default).toBeUndefined();
        expect(calApiVersion.default).toBeDefined();
    });

    test('auth overrides', () => {
        const inputSchema = apiToolToInputSchema(tool, {'Authorization': 'Bearer <token>'});
        const {params}: Record<string, Schema> = (inputSchema as SchemaObject).properties ?? {};
        if (params === undefined || typeof params === 'boolean') {
            fail('params is not a SchemaObject');
        }

        const {properties} = params;
        if (properties === undefined) {
            fail('properties is not defined');
        }

        const {'Authorization': authorization, 'cal-api-version': calApiVersion} = properties;
        if (typeof authorization !== 'object') {
            fail('Authorization is not a SchemaObject');
        }
        if (typeof calApiVersion !== 'object') {
            fail('cal-api-version is not a SchemaObject');
        }

        expect(authorization.default).toBeDefined();
        expect(calApiVersion.default).toBeDefined();
    });
});