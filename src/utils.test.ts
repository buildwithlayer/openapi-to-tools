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
        describe('header parameters, simple', () => {
            test('primitive', () => {
            });

            test('array', () => {
                // TODO: test explode, no explode
            });

            test('object', () => {
                // TODO: test explode, no explode
            });
        });

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
                        expect(actual).toBe('https://example.com/api/?queryParam=string1&queryParam=string2');
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

            describe('spaceDelimited', () => {
                // TODO: test array, object
                // TODO: test explode, no explode
            });

            describe('pipeDelimited', () => {
                // TODO: test array, object
                // TODO: test explode, no explode
            });

            describe('deepObject', () => {
                // TODO: test object
                // TODO: test explode, no explode
            });
        });
    });

    describe('content parameters', () => {
        describe('header parameters', () => {
            describe('primitive', () => {
                // TODO: text/plain
            });

            describe('array', () => {
                // TODO: application/json + text/plain
            });

            describe('object', () => {
                // TODO: application/json + application/xml + text/plain
            });
        });

        describe('path parameters', () => {
            describe('primitive', () => {
                // TODO: text/plain
            });

            describe('array', () => {
                // TODO: application/json + text/plain
            });

            describe('object', () => {
                // TODO: application/json + application/xml + text/plain
            });
        });

        describe('query parameters', () => {
            describe('primitive', () => {
                // TODO: text/plain
            });

            describe('array', () => {
                // TODO: application/json + text/plain
            });

            describe('object', () => {
                // TODO: application/json + application/xml + text/plain
            });
        });
    });
});