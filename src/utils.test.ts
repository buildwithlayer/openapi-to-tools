import {Parameter} from '@buildwithlayer/openapi-zod-spec/3/1/1/parameter.js';
import {Schema, SchemaObject} from '@buildwithlayer/openapi-zod-spec/3/1/1/schema.js';
import {APITool} from './types.js';
import {apiToolToInputSchema, buildUrlFromParameters} from './utils.js';

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

describe('buildUrlFromParameters', () => {
    const defs: Record<string, SchemaObject> = {
        Array: {
            default: ['string1', 'string2'],
            items: {
                type: 'string',
            },
            type: 'array',
        },
        Object: {
            default: {
                age: 40,
                name: 'Bob',
            },
            properties: {
                age: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                },
            },
            type: 'object',
        },
        Primitive: {
            default: 'stringValue',
            type: 'string',
        },
    };
    const primitiveValue = 'stringValue';
    const arrayValue = ['string1', 'string2'];
    const objectValue = {
        age: 40,
        name: 'Bob',
    };

    describe('schema parameters', () => {
        describe('path parameters', () => {
            const url = 'https://example.com/api/{pathParam}';

            describe('matrix', () => {
                test('primitive', () => {
                    const parameters = [
                        {
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                            schema: defs['Primitive'],
                            style: 'matrix',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'pathParam': primitiveValue});
                    expect(actual).toBe('https://example.com/api/;pathParam=stringValue');
                });

                describe('array', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Array'],
                                style: 'matrix',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': arrayValue});
                        expect(actual).toBe('https://example.com/api/;pathParam=string1;pathParam=string2');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Array'],
                                style: 'matrix',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': arrayValue});
                        expect(actual).toBe('https://example.com/api/;pathParam=string1,string2');
                    });
                });

                describe('object', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'matrix',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/;age=40;name=Bob');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'matrix',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/;pathParam=age,40,name,Bob');
                    });
                });
            });

            describe('label', () => {
                test('primitive', () => {
                    const parameters = [
                        {
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                            schema: defs['Primitive'],
                            style: 'label',
                        },
                    ];
                    const actual = buildUrlFromParameters('https://example.com/api/{pathParam}', parameters, {'pathParam': 'stringValue'});
                    expect(actual).toBe('https://example.com/api/.stringValue');
                });

                test('array', () => {
                    const parameters = [
                        {
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                            schema: defs['Array'],
                            style: 'label',
                        },
                    ];
                    const actual = buildUrlFromParameters('https://example.com/api/{pathParam}', parameters, {'pathParam': ['string1', 'string2']});
                    expect(actual).toBe('https://example.com/api/.string1.string2');
                });

                describe('object', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'label',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/.age=40.name=Bob');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'label',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/.age.40.name.Bob');
                    });
                });
            });

            describe('simple', () => {
                test('primitive', () => {
                    const parameters = [
                        {
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                            schema: defs['Primitive'],
                            style: 'simple',
                        },
                    ];
                    const actual = buildUrlFromParameters('https://example.com/api/{pathParam}', parameters, {'pathParam': 'stringValue'});
                    expect(actual).toBe('https://example.com/api/stringValue');
                });

                test('array', () => {
                    const parameters = [
                        {
                            explode: true,
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                            schema: defs['Array'],
                            style: 'simple',
                        },
                    ];
                    const actual = buildUrlFromParameters('https://example.com/api/{pathParam}', parameters, {'pathParam': ['string1', 'string2']});
                    expect(actual).toBe('https://example.com/api/string1,string2');
                });

                describe('object', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'simple',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/age=40,name=Bob');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'path' as const,
                                name: 'pathParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'simple',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                        expect(actual).toBe('https://example.com/api/age,40,name,Bob');
                    });
                });
            });
        });
        describe('query parameters', () => {
            const url = 'https://example.com/api/';

            describe('form', () => {
                test('primitive', () => {
                    const parameters = [
                        {
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                            schema: defs['Primitive'],
                            style: 'form',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': primitiveValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=stringValue');
                });

                describe('array', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'query' as const,
                                name: 'queryParam',
                                required: true,
                                schema: defs['Array'],
                                style: 'form',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                        expect(actual).toBe('https://example.com/api/?queryParam=string1&queryParam=string2');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'query' as const,
                                name: 'queryParam',
                                required: true,
                                schema: defs['Array'],
                                style: 'form',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                        expect(actual).toBe('https://example.com/api/?queryParam=string1,string2');
                    });
                });

                describe('object', () => {
                    test('explode', () => {
                        const parameters = [
                            {
                                explode: true,
                                in: 'query' as const,
                                name: 'queryParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'form',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                        expect(actual).toBe('https://example.com/api/?age=40&name=Bob');
                    });

                    test('no explode', () => {
                        const parameters = [
                            {
                                explode: false,
                                in: 'query' as const,
                                name: 'queryParam',
                                required: true,
                                schema: defs['Object'],
                                style: 'form',
                            },
                        ];
                        const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                        expect(actual).toBe('https://example.com/api/?queryParam=age,40,name,Bob');
                    });
                });
            });

            describe('spaceDelimited', () => {
                test('array', () => {
                    const parameters = [
                        {
                            explode: false,
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                            schema: defs['Array'],
                            style: 'spaceDelimited',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=string1%20string2');
                });

                test('object', () => {
                    const parameters = [
                        {
                            explode: false,
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                            schema: defs['Object'],
                            style: 'spaceDelimited',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=age%2040%20name%20Bob');
                });
            });

            describe('pipeDelimited', () => {
                test('array', () => {
                    const parameters = [
                        {
                            explode: false,
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                            schema: defs['Array'],
                            style: 'pipeDelimited',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=string1%7Cstring2');
                });

                test('object', () => {
                    const parameters = [
                        {
                            explode: false,
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                            schema: defs['Object'],
                            style: 'pipeDelimited',
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=age%7C40%7Cname%7CBob');
                });
            });

            test('deepObject', () => {
                const parameters = [
                    {
                        explode: true,
                        in: 'query' as const,
                        name: 'queryParam',
                        required: true,
                        schema: defs['Object'],
                        style: 'deepObject',
                    },
                ];
                const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                expect(actual).toBe('https://example.com/api/?queryParam%5Bage%5D=40&queryParam%5Bname%5D=Bob');
            });
        });
    });

    describe('content parameters', () => {
        describe('path parameters', () => {
            const url = 'https://example.com/api/{pathParam}';

            test('primitive', () => {
                const parameters = [
                    {
                        content: {
                            'text/plain': {
                                schema: defs['Primitive'],
                            },
                        },
                        in: 'path' as const,
                        name: 'pathParam',
                        required: true,
                    },
                ];
                const actual = buildUrlFromParameters(url, parameters, {'pathParam': primitiveValue});
                expect(actual).toBe('https://example.com/api/stringValue');
            });

            describe('array', () => {
                test('text/plain', () => {
                    const parameters = [
                        {
                            content: {
                                'application/json': {
                                    schema: defs['Array'],
                                },
                            },
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'pathParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/%5B%22string1%22%2C%22string2%22%5D');
                });
                test('application/json', () => {
                    const parameters = [
                        {
                            content: {
                                'application/json': {
                                    schema: defs['Array'],
                                },
                            },
                            in: 'path' as const,
                            name: 'pathParam',
                            required: true,
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'pathParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/%5B%22string1%22%2C%22string2%22%5D');
                });
            });

            test('object', () => {
                const parameters = [
                    {
                        content: {
                            'application/json': {
                                schema: defs['Object'],
                            },
                        },
                        in: 'path' as const,
                        name: 'pathParam',
                        required: true,
                    },
                ];
                const actual = buildUrlFromParameters(url, parameters, {'pathParam': objectValue});
                expect(actual).toBe('https://example.com/api/%7B%22age%22%3A40%2C%22name%22%3A%22Bob%22%7D');
            });
        });
        describe('query parameters', () => {
            const url = 'https://example.com/api/';

            test('primitive', () => {
                const parameters = [
                    {
                        content: {
                            'text/plain': {
                                schema: defs['Primitive'],
                            },
                        },
                        in: 'query' as const,
                        name: 'queryParam',
                        required: true,
                    },
                ];
                const actual = buildUrlFromParameters(url, parameters, {'queryParam': primitiveValue});
                expect(actual).toBe('https://example.com/api/?queryParam=stringValue');
            });

            describe('array', () => {
                test('text/plain', () => {
                    const parameters = [
                        {
                            content: {
                                'text/plain': {
                                    schema: defs['Array'],
                                },
                            },
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=string1%2Cstring2');
                });
                test('application/json', () => {
                    const parameters = [
                        {
                            content: {
                                'application/json': {
                                    schema: defs['Array'],
                                },
                            },
                            in: 'query' as const,
                            name: 'queryParam',
                            required: true,
                        },
                    ];
                    const actual = buildUrlFromParameters(url, parameters, {'queryParam': arrayValue});
                    expect(actual).toBe('https://example.com/api/?queryParam=%5B%22string1%22%2C%22string2%22%5D');
                });
            });

            test('object', () => {
                const parameters = [
                    {
                        content: {
                            'application/json': {
                                schema: defs['Object'],
                            },
                        },
                        in: 'query' as const,
                        name: 'queryParam',
                        required: true,
                    },
                ];
                const actual = buildUrlFromParameters(url, parameters, {'queryParam': objectValue});
                expect(actual).toBe('https://example.com/api/?queryParam=%7B%22age%22%3A40%2C%22name%22%3A%22Bob%22%7D');
            });
        });
    });

    test('many different parameters', () => {
        const url = 'https://example.com/api/{id}';
        const parameters: Parameter[] = [
            {
                explode: false,
                in: 'path',
                name: 'id',
                required: true,
                schema: {
                    type: 'string',
                },
                style: 'simple',
            },
            {
                content: {
                    'text/plain': {
                        schema: defs['Array'],
                    },
                },
                in: 'query' as const,
                name: 'contentArray',
                required: true,
            },
            {
                content: {
                    'application/json': {
                        schema: defs['Object'],
                    },
                },
                in: 'query' as const,
                name: 'contentObject',
                required: true,
            },
            {
                explode: false,
                in: 'query' as const,
                name: 'schemaObject',
                required: true,
                schema: defs['Object'],
                style: 'form',
            },
        ];
        const paramValues = {
            contentArray: ['string1', 'string2'],
            contentObject: {
                age: 40,
                name: 'Bob',
            },
            id: '12345',
            schemaObject: {
                age: 42,
                name: 'Sally',
            },
        };
        const actual = buildUrlFromParameters(url, parameters, paramValues);
        expect(actual).toBe('https://example.com/api/12345?contentArray=string1%2Cstring2&contentObject=%7B%22age%22%3A40%2C%22name%22%3A%22Bob%22%7D&schemaObject=age,42,name,Sally');
    });
});