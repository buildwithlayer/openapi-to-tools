import {APITool} from '../src/types';
import {apiToolToInputSchema} from '../src/utils';

test('apiToolToInputSchema', () => {
    const tool: APITool = {
        'body': {
            '$ref': '#/$defs/CreateManagedUserInput',
        },
        'contentType': 'application/json',
        'defs': {
            'CreateManagedUserInput': {
                'properties': {
                    'avatarUrl': {
                        'description': 'URL of the user\'s avatar image',
                        'examples': [
                            'https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png',
                        ],
                        'type': 'string',
                    },
                    'bio': {
                        'description': 'Bio',
                        'examples': [
                            'I am a bio',
                        ],
                        'type': 'string',
                    },
                    'email': {
                        'examples': [
                            'alice@example.com',
                        ],
                        'type': 'string',
                    },
                    'locale': {
                        'enum': [
                            'ar',
                            'ca',
                            'de',
                            'es',
                            'eu',
                            'he',
                            'id',
                            'ja',
                            'lv',
                            'pl',
                            'ro',
                            'sr',
                            'th',
                            'vi',
                            'az',
                            'cs',
                            'el',
                            'es-419',
                            'fi',
                            'hr',
                            'it',
                            'km',
                            'nl',
                            'pt',
                            'ru',
                            'sv',
                            'tr',
                            'zh-CN',
                            'bg',
                            'da',
                            'en',
                            'et',
                            'fr',
                            'hu',
                            'iw',
                            'ko',
                            'no',
                            'pt-BR',
                            'sk',
                            'ta',
                            'uk',
                            'zh-TW',
                        ],
                        'examples': [
                            'en',
                        ],
                        'type': 'string',
                    },
                    'metadata': {
                        'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.',
                        'examples': [
                            {
                                'key': 'value',
                            },
                        ],
                        'type': 'object',
                    },
                    'name': {
                        'description': 'Managed user\'s name is used in emails',
                        'examples': [
                            'Alice Smith',
                        ],
                        'type': 'string',
                    },
                    'timeFormat': {
                        'description': 'Must be a number 12 or 24',
                        'enum': [
                            12,
                            24,
                        ],
                        'examples': [
                            12,
                        ],
                        'type': 'number',
                    },
                    'timeZone': {
                        'description': 'Timezone is used to create user\'s default schedule from Monday to Friday from 9AM to 5PM. If it is not passed then user does not have\n      a default schedule and it must be created manually via the /schedules endpoint. Until the schedule is created, the user can\'t access availability atom to set his / her availability nor booked.\n      It will default to Europe/London if not passed.',
                        'examples': [
                            'America/New_York',
                        ],
                        'type': 'string',
                    },
                    'weekStart': {
                        'enum': [
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                            'Sunday',
                        ],
                        'examples': [
                            'Monday',
                        ],
                        'type': 'string',
                    },
                },
                'required': [
                    'email',
                    'name',
                ],
                'type': 'object',
            },
        },
        'description': 'Create a managed user',
        'method': 'post',
        'name': 'OAuthClientUsersController_createUser',
        'params': [
            {
                'description': 'OAuth client secret key',
                'explode': false,
                'in': 'header',
                'name': 'x-cal-secret-key',
                'required': true,
                'schema': {
                    'type': 'string',
                },
                'style': 'simple',
            },
            {
                'explode': false,
                'in': 'path',
                'name': 'clientId',
                'required': true,
                'schema': {
                    'type': 'string',
                },
                'style': 'simple',
            },
        ],
        'url': 'https://api.cal.com/v2/oauth-clients/{clientId}/users',
    };
    const inputSchema = apiToolToInputSchema(tool);
    expect(inputSchema.required).toContain('body');
});