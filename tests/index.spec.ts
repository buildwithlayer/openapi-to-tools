import {Components} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/components.js';
import {operationToTool} from '../src';

describe('operationToTool', () => {
    test('defs', () => {
        const tool = operationToTool(
            'post',
            {
                'operationId': 'OAuthClientUsersController_createUser',
                'parameters': [
                    {
                        'description': 'OAuth client secret key',
                        'in': 'header',
                        'name': 'x-cal-secret-key',
                        'required': true,
                        'schema': {
                            'type': 'string',
                        },
                    },
                    {
                        'in': 'path',
                        'name': 'clientId',
                        'required': true,
                        'schema': {
                            'type': 'string',
                        },
                    },
                ],
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CreateManagedUserInput',
                            },
                        },
                    },
                    'required': true,
                },
                'responses': {
                    '201': {
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/CreateManagedUserOutput',
                                },
                            },
                        },
                        'description': '',
                    },
                },
                'summary': 'Create a managed user',
                'tags': ['Platform / Managed Users'],
            },
            '/v2/oauth-clients/{clientId}/users',
            [],
            {
                'url': 'https://api.cal.com',
            },
            [],
            Components.parse({
                'schemas': {
                    'AddressFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `address` and the URL contains query parameter `&address=1234 Main St, London`,      the address field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter your address',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., 1234 Main St',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `address`',
                                'example': 'address',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'AddressFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `address` and the URL contains query parameter `&address=1234 Main St, London`,      the address field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter your address',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., 1234 Main St',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `address`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'address',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'ApiKeyOutput': {
                        'properties': {
                            'apiKey': {
                                'type': 'string',
                            },
                        },
                        'required': ['apiKey'],
                        'type': 'object',
                    },
                    'AssignedOptionOutput': {
                        'properties': {
                            'assignedUserIds': {
                                'description': 'Ids of the users assigned to the attribute option.',
                                'example': [124, 224],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'attributeId': {
                                'description': 'The ID of the attribute',
                                'example': 'attr_id',
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The ID of the option',
                                'example': 'attr_option_id',
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'The slug of the option',
                                'example': 'option-slug',
                                'type': 'string',
                            },
                            'value': {
                                'description': 'The value of the option',
                                'example': 'option_value',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'attributeId', 'value', 'slug', 'assignedUserIds'],
                        'type': 'object',
                    },
                    'AssignOptionUserOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/AssignOptionUserOutputData',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'AssignOptionUserOutputData': {
                        'properties': {
                            'attributeOptionId': {
                                'description': 'The value of the option',
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The ID of the option assigned to the user',
                                'type': 'string',
                            },
                            'memberId': {
                                'description': 'The ID form the org membership for the user',
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'memberId', 'attributeOptionId'],
                        'type': 'object',
                    },
                    'AssignOrganizationAttributeOptionToUserInput': {
                        'properties': {
                            'attributeId': {
                                'type': 'string',
                            },
                            'attributeOptionId': {
                                'type': 'string',
                            },
                            'value': {
                                'type': 'string',
                            },
                        },
                        'required': ['attributeId'],
                        'type': 'object',
                    },
                    'Attendee': {
                        'properties': {
                            'email': {
                                'description': 'The email of the attendee.',
                                'example': 'john.doe@example.com',
                                'type': 'string',
                            },
                            'language': {
                                'default': 'en',
                                'description': 'The preferred language of the attendee. Used for booking confirmation.',
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
                                'example': 'it',
                                'type': 'string',
                            },
                            'name': {
                                'description': 'The name of the attendee.',
                                'example': 'John Doe',
                                'type': 'string',
                            },
                            'phoneNumber': {
                                'description': 'The phone number of the attendee in international format.',
                                'example': '+919876543210',
                                'type': 'string',
                            },
                            'timeZone': {
                                'description': 'The time zone of the attendee.',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                        },
                        'required': ['name', 'timeZone'],
                        'type': 'object',
                    },
                    'Attribute': {
                        'properties': {
                            'enabled': {
                                'description': 'Whether the attribute is enabled and displayed on their profile',
                                'example': true,
                                'type': 'boolean',
                            },
                            'id': {
                                'description': 'The ID of the attribute',
                                'example': 'attr_123',
                                'type': 'string',
                            },
                            'name': {
                                'description': 'The name of the attribute',
                                'example': 'Attribute Name',
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'The slug of the attribute',
                                'example': 'attribute-name',
                                'type': 'string',
                            },
                            'teamId': {
                                'description': 'The team ID associated with the attribute',
                                'example': 1,
                                'type': 'number',
                            },
                            'type': {
                                'description': 'The type of the attribute',
                                'enum': ['TEXT', 'NUMBER', 'SINGLE_SELECT', 'MULTI_SELECT'],
                                'type': 'string',
                            },
                            'usersCanEditRelation': {
                                'description': 'Whether users can edit the relation',
                                'example': true,
                                'type': 'boolean',
                            },
                        },
                        'required': ['id', 'teamId', 'type', 'name', 'slug', 'enabled'],
                        'type': 'object',
                    },
                    'AvailabilityModel': {
                        'properties': {
                            'date': {
                                'format': 'date-time',
                                'nullable': true,
                                'type': 'string',
                            },
                            'days': {
                                'items': {
                                    'type': 'number',
                                },
                                'type': 'array',
                            },
                            'endTime': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'eventTypeId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'scheduleId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'startTime': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'userId': {
                                'nullable': true,
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'days', 'startTime', 'endTime'],
                        'type': 'object',
                    },
                    'BaseAttribute': {
                        'properties': {
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name'],
                        'type': 'object',
                    },
                    'BaseBookingLimitsCount_2024_06_14': {
                        'properties': {
                            'day': {
                                'description': 'The number of bookings per day',
                                'example': 1,
                                'type': 'number',
                            },
                            'disabled': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'month': {
                                'description': 'The number of bookings per month',
                                'example': 3,
                                'type': 'number',
                            },
                            'week': {
                                'description': 'The number of bookings per week',
                                'example': 2,
                                'type': 'number',
                            },
                            'year': {
                                'description': 'The number of bookings per year',
                                'example': 4,
                                'type': 'number',
                            },
                        },
                        'type': 'object',
                    },
                    'BaseBookingLimitsDuration_2024_06_14': {
                        'properties': {
                            'day': {
                                'description': 'The duration of bookings per day (must be a multiple of 15)',
                                'example': 60,
                                'type': 'number',
                            },
                            'month': {
                                'description': 'The duration of bookings per month (must be a multiple of 15)',
                                'example': 180,
                                'type': 'number',
                            },
                            'week': {
                                'description': 'The duration of bookings per week (must be a multiple of 15)',
                                'example': 120,
                                'type': 'number',
                            },
                            'year': {
                                'description': 'The duration of bookings per year (must be a multiple of 15)',
                                'example': 240,
                                'type': 'number',
                            },
                        },
                        'type': 'object',
                    },
                    'BaseConfirmationPolicy_2024_06_14': {
                        'properties': {
                            'blockUnconfirmedBookingsInBooker': {
                                'description': 'Unconfirmed bookings still block calendar slots.',
                                'type': 'boolean',
                            },
                            'noticeThreshold': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/NoticeThreshold_2024_06_14',
                                    },
                                ],
                                'description': 'The notice threshold required before confirmation is needed. Required when type is \'time\'.',
                            },
                            'type': {
                                'description': 'The policy that determines when confirmation is required',
                                'enum': ['always', 'time'],
                                'example': 'always',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'blockUnconfirmedBookingsInBooker'],
                        'type': 'object',
                    },
                    'BookerLayouts_2024_06_14': {
                        'properties': {
                            'defaultLayout': {
                                'enum': ['month', 'week', 'column'],
                                'type': 'string',
                            },
                            'enabledLayouts': {
                                'description': 'Array of valid layouts - month, week or column',
                                'items': {
                                    'enum': ['month', 'week', 'column'],
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['defaultLayout', 'enabledLayouts'],
                        'type': 'object',
                    },
                    'BookingHost': {
                        'properties': {
                            'email': {
                                'example': 'jane100@example.com',
                                'type': 'string',
                            },
                            'id': {
                                'example': 1,
                                'type': 'number',
                            },
                            'name': {
                                'example': 'Jane Doe',
                                'type': 'string',
                            },
                            'timeZone': {
                                'example': 'America/Los_Angeles',
                                'type': 'string',
                            },
                            'username': {
                                'example': 'jane100',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'email', 'username', 'timeZone'],
                        'type': 'object',
                    },
                    'BookingInputAddressLocation_2024_08_13': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `address` - it refers to address defined by the organizer.',
                                'example': 'address',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'BookingInputAttendeeAddressLocation_2024_08_13': {
                        'properties': {
                            'address': {
                                'example': '123 Example St, City, Country',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `attendeeAddress`',
                                'example': 'attendeeAddress',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'address'],
                        'type': 'object',
                    },
                    'BookingInputAttendeeDefinedLocation_2024_08_13': {
                        'properties': {
                            'location': {
                                'example': '321 Example St, City, Country',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `attendeeDefined`',
                                'example': 'attendeeDefined',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'location'],
                        'type': 'object',
                    },
                    'BookingInputAttendeePhoneLocation_2024_08_13': {
                        'properties': {
                            'phone': {
                                'example': '+37120993151',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `attendeePhone`',
                                'example': 'attendeePhone',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'phone'],
                        'type': 'object',
                    },
                    'BookingInputIntegrationLocation_2024_08_13': {
                        'properties': {
                            'integration': {
                                'enum': [
                                    'cal-video',
                                    'google-meet',
                                    'zoom',
                                    'whereby-video',
                                    'whatsapp-video',
                                    'webex-video',
                                    'telegram-video',
                                    'tandem',
                                    'sylaps-video',
                                    'skype-video',
                                    'sirius-video',
                                    'signal-video',
                                    'shimmer-video',
                                    'salesroom-video',
                                    'roam-video',
                                    'riverside-video',
                                    'ping-video',
                                    'office365-video',
                                    'mirotalk-video',
                                    'jitsi',
                                    'jelly-video',
                                    'jelly-conferencing',
                                    'huddle',
                                    'facetime-video',
                                    'element-call-video',
                                    'eightxeight-video',
                                    'discord-video',
                                    'demodesk-video',
                                    'campfire-video',
                                ],
                                'example': 'cal-video',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `integration`',
                                'example': 'integration',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'integration'],
                        'type': 'object',
                    },
                    'BookingInputLinkLocation_2024_08_13': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `link` - it refers to link defined by the organizer.',
                                'example': 'link',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'BookingInputOrganizersDefaultAppLocation_2024_08_13': {
                        'properties': {
                            'type': {
                                'description': 'only available for team event types and the only allowed value for type is `organizersDefaultApp` - it refers to the default app defined by the organizer.',
                                'example': 'organizersDefaultApp',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'BookingInputPhoneLocation_2024_08_13': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `phone` - it refers to phone defined by the organizer.',
                                'example': 'phone',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'BookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/Attendee',
                                },
                                'type': 'array',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'guests': {
                                'example': ['guest1@example.com', 'guest2@example.com'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'attendees',
                            'bookingFieldsResponses',
                        ],
                        'type': 'object',
                    },
                    'BookingReference': {
                        'properties': {
                            'destinationCalendarId': {
                                'description': 'The id of the calendar the event is created in',
                                'nullable': true,
                                'type': 'string',
                            },
                            'eventUid': {
                                'description': 'The event uid of the booking',
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The id of the booking reference',
                                'type': 'number',
                            },
                            'type': {
                                'description': 'The type of the booking reference',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'eventUid', 'destinationCalendarId', 'id'],
                        'type': 'object',
                    },
                    'BookingReferencesOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking References',
                                'items': {
                                    '$ref': '#/components/schemas/BookingReference',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'description': 'The status of the request, always \'success\' for successful responses',
                                'example': 'success',
                                'type': 'object',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'BooleanFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Agree to terms?',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `boolean`',
                                'example': 'boolean',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden'],
                        'type': 'object',
                    },
                    'BooleanFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Agree to terms?',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `boolean`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'boolean',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'BusinessDaysWindow_2024_06_14': {
                        'properties': {
                            'rolling': {
                                'description': '\n      Determines the behavior of the booking window:\n      - If **true**, the window is rolling. This means the number of available days will always be equal the specified \'value\' \n        and adjust dynamically as bookings are made. For example, if \'value\' is 3 and availability is only on Mondays, \n        a booker attempting to schedule on November 10 will see slots on November 11, 18, and 25. As one of these days \n        becomes fully booked, a new day (e.g., December 2) will open up to ensure 3 available days are always visible.\n      - If **false**, the window is fixed. This means the booking window only considers the next \'value\' days from the\n        moment someone is trying to book. For example, if \'value\' is 3, availability is only on Mondays, and the current \n        date is November 10, the booker will only see slots on November 11 because the window is restricted to the next \n        3 calendar days (November 10–12).\n    ',
                                'example': true,
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'Whether the window should be business days, calendar days or a range of dates',
                                'enum': ['businessDays', 'calendarDays', 'range'],
                                'type': 'string',
                            },
                            'value': {
                                'description': 'How many business day into the future can this event be booked',
                                'example': 5,
                                'type': 'number',
                            },
                        },
                        'required': ['type', 'value'],
                        'type': 'object',
                    },
                    'BusyTimesOutput': {
                        'properties': {
                            'end': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'source': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'start': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                        },
                        'required': ['start', 'end'],
                        'type': 'object',
                    },
                    'Calendar': {
                        'properties': {
                            'credentialId': {
                                'type': 'number',
                            },
                            'delegationCredentialId': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'integration': {
                                'type': 'string',
                            },
                            'isSelected': {
                                'type': 'boolean',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'primary': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'readOnly': {
                                'type': 'boolean',
                            },
                        },
                        'required': ['externalId', 'readOnly', 'isSelected', 'credentialId'],
                        'type': 'object',
                    },
                    'CalendarDaysWindow_2024_06_14': {
                        'properties': {
                            'rolling': {
                                'description': '\n      Determines the behavior of the booking window:\n      - If **true**, the window is rolling. This means the number of available days will always be equal the specified \'value\' \n        and adjust dynamically as bookings are made. For example, if \'value\' is 3 and availability is only on Mondays, \n        a booker attempting to schedule on November 10 will see slots on November 11, 18, and 25. As one of these days \n        becomes fully booked, a new day (e.g., December 2) will open up to ensure 3 available days are always visible.\n      - If **false**, the window is fixed. This means the booking window only considers the next \'value\' days from the\n        moment someone is trying to book. For example, if \'value\' is 3, availability is only on Mondays, and the current \n        date is November 10, the booker will only see slots on November 11 because the window is restricted to the next \n        3 calendar days (November 10–12).\n    ',
                                'example': true,
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'Whether the window should be business days, calendar days or a range of dates',
                                'enum': ['businessDays', 'calendarDays', 'range'],
                                'type': 'string',
                            },
                            'value': {
                                'description': 'How many calendar days into the future can this event be booked',
                                'example': 5,
                                'type': 'number',
                            },
                        },
                        'required': ['type', 'value'],
                        'type': 'object',
                    },
                    'CalendarLink': {
                        'properties': {
                            'label': {
                                'description': 'The label of the calendar link',
                                'type': 'string',
                            },
                            'link': {
                                'description': 'The link to the calendar',
                                'type': 'string',
                            },
                        },
                        'required': ['label', 'link'],
                        'type': 'object',
                    },
                    'CalendarLinksOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Calendar links for the booking',
                                'items': {
                                    '$ref': '#/components/schemas/CalendarLink',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'description': 'The status of the request, always \'success\' for successful responses',
                                'example': 'success',
                                'type': 'object',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CancelBookingInput_2024_08_13': {
                        'properties': {
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelSubsequentBookings': {
                                'description': 'For recurring non-seated booking - if true, cancel booking with the bookingUid of the individual recurrence and all recurrences that come after it.',
                                'type': 'boolean',
                            },
                        },
                        'type': 'object',
                    },
                    'CancelBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                    {
                                        '$ref': '#/components/schemas/GetSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/GetRecurringSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/GetRecurringSeatedBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CancelSeatedBookingInput_2024_08_13': {
                        'properties': {
                            'seatUid': {
                                'description': 'Uid of the specific seat within booking.',
                                'example': '3be561a9-31f1-4b8e-aefc-9d9a085f0dd1',
                                'type': 'string',
                            },
                        },
                        'required': ['seatUid'],
                        'type': 'object',
                    },
                    'CheckboxGroupFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `notify-me` and the URL contains query parameter `&notify-me=true`,      the checkbox will be selected and the checkbox field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Select all that apply',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Checkbox 1', 'Checkbox 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `checkbox`',
                                'example': 'checkbox',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden'],
                        'type': 'object',
                    },
                    'CheckboxGroupFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `notify-me` and the URL contains query parameter `&notify-me=true`,      the checkbox will be selected and the checkbox field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Select all that apply',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Checkbox 1', 'Checkbox 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `checkbox`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'checkbox',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'ConferencingAppOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ConferencingAppsOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ConferencingAppsOutputDto': {
                        'properties': {
                            'id': {
                                'description': 'Id of the conferencing app credentials',
                                'type': 'number',
                            },
                            'invalid': {
                                'description': 'Whether if the connection is working or not.',
                                'example': true,
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'Type of conferencing app',
                                'example': 'google_video',
                                'type': 'string',
                            },
                            'userId': {
                                'description': 'Id of the user associated to the conferencing app',
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'type', 'userId'],
                        'type': 'object',
                    },
                    'ConferencingAppsOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/ConferencingAppsOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ConnectedCalendar': {
                        'properties': {
                            'calendars': {
                                'items': {
                                    '$ref': '#/components/schemas/Calendar',
                                },
                                'type': 'array',
                            },
                            'credentialId': {
                                'type': 'number',
                            },
                            'delegationCredentialId': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'integration': {
                                '$ref': '#/components/schemas/Integration',
                            },
                            'primary': {
                                '$ref': '#/components/schemas/Primary',
                            },
                        },
                        'required': ['integration', 'credentialId'],
                        'type': 'object',
                    },
                    'ConnectedCalendarsData': {
                        'properties': {
                            'connectedCalendars': {
                                'items': {
                                    '$ref': '#/components/schemas/ConnectedCalendar',
                                },
                                'type': 'array',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar',
                            },
                        },
                        'required': ['connectedCalendars', 'destinationCalendar'],
                        'type': 'object',
                    },
                    'ConnectedCalendarsOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ConnectedCalendarsData',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateAttributeOptionOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OptionOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateBookingInput_2024_08_13': {
                        'properties': {
                            'attendee': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Attendee',
                                    },
                                ],
                                'description': 'The attendee\'s details.',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values for custom booking fields added by you.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'eventTypeId': {
                                'description': 'The ID of the event type that is booked. Required unless eventTypeSlug and username are provided as an alternative to identifying the event type.',
                                'example': 123,
                                'type': 'number',
                            },
                            'eventTypeSlug': {
                                'description': 'The slug of the event type. Required along with username / teamSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'my-event-type',
                                'type': 'string',
                            },
                            'guests': {
                                'description': 'An optional list of guest emails attending the event.',
                                'example': ['guest1@example.com', 'guest2@example.com'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'lengthInMinutes': {
                                'description': 'If it is an event type that has multiple possible lengths that attendee can pick from, you can pass the desired booking length here.\n    If not provided then event type default length will be used for the booking.',
                                'example': 30,
                                'type': 'number',
                            },
                            'location': {
                                'description': 'One of the event type locations. If instead of passing one of the location objects as required by schema you are still passing a string please use an object.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingInputAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputIntegrationLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputLinkLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputPhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13',
                                    },
                                ],
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - use \'location\' instead. Meeting URL just for this booking. Displayed in email and calendar event. If not provided then cal video link will be generated.',
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and string values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'organizationSlug': {
                                'description': 'The organization slug. Optional, only used when booking with eventTypeSlug + username or eventTypeSlug + teamSlug.',
                                'example': 'acme-corp',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'The start time of the booking in ISO 8601 format in UTC timezone.',
                                'example': '2024-08-13T09:00:00Z',
                                'type': 'string',
                            },
                            'teamSlug': {
                                'description': 'Team slug for team that owns event type for which slots are fetched. Required along with eventTypeSlug and optionally organizationSlug if the team is part of organization',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                            'username': {
                                'description': 'The username of the event owner. Required along with eventTypeSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                        },
                        'required': ['start', 'attendee'],
                        'type': 'object',
                    },
                    'CreateBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking data, which can be either a BookingOutput object or an array of RecurringBookingOutput objects',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CreateSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/CreateRecurringSeatedBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateCalendarCredentialsInput': {
                        'properties': {
                            'password': {
                                'type': 'string',
                            },
                            'username': {
                                'type': 'string',
                            },
                        },
                        'required': ['username', 'password'],
                        'type': 'object',
                    },
                    'CreateDelegationCredentialInput': {
                        'properties': {
                            'domain': {
                                'type': 'string',
                            },
                            'serviceAccountKey': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/GoogleServiceAccountKeyInput',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'workspacePlatformSlug': {
                                'type': 'string',
                            },
                        },
                        'required': ['workspacePlatformSlug', 'domain', 'serviceAccountKey'],
                        'type': 'object',
                    },
                    'CreateDelegationCredentialOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DelegationCredentialOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateEventTypeInput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'description': 'Time spaces that can be appended after an event to give more time after it.',
                                'type': 'number',
                            },
                            'beforeEventBuffer': {
                                'description': 'Time spaces that can be prepended before an event to give more time before it.',
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                                    },
                                ],
                                'description': 'Should booker have week, month or column view. Specify default layout and enabled layouts user can pick.',
                            },
                            'bookingFields': {
                                'description': 'Custom fields that can be added to the booking form when the event is booked by someone. By default booking form has name and email field.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/UrlFieldInput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'description': 'Limit how many times this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsCount_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingLimitsDuration': {
                                'description': 'Limit total amount of time that this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsDuration_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'description': 'Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseConfirmationPolicy_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'customName': {
                                'description': 'Customizable event name with valid variables: \n      {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, \n      {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, \n      {HOST/ATTENDEE}, {HOST}, {ATTENDEE}, {USER}',
                                'example': '{Event type title} between {Organiser} and {Scheduler}',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of the Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'description': 'If true, person booking this event can\'t add guests via their emails.',
                                'type': 'boolean',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'description': 'Locations where the event will take place. If not provided, cal video link will be used as the location.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/InputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeePhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeDefinedLocation_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'minimumBookingNotice': {
                                'description': 'Minimum number of minutes before the event that a booking can be made.',
                                'type': 'number',
                            },
                            'offsetStart': {
                                'description': 'Offset timeslots shown to bookers by a specified number of minutes',
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'description': 'This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.',
                                'type': 'boolean',
                            },
                            'recurrence': {
                                'description': 'Create a recurring event type.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'description': 'If you want that this event has different schedule than user\'s default one you can specify it here.',
                                'type': 'number',
                            },
                            'seats': {
                                'description': 'Create an event type with multiple seats.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Seats_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'slotInterval': {
                                'description': 'Number representing length of each slot when event is booked. By default it equal length of the event type.\n      If event length is 60 minutes then we would have slots 9AM, 10AM, 11AM etc. but if it was changed to 30 minutes then\n      we would have slots 9AM, 9:30AM, 10AM, 10:30AM etc. as the available times to book the 60 minute event.',
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'description': 'A valid URL where the booker will redirect to, once the booking is completed successfully',
                                'example': 'https://masterchief.com/argentina/flan/video/9129412',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                        },
                        'required': ['lengthInMinutes', 'title', 'slug'],
                        'type': 'object',
                    },
                    'CreateEventTypeOutput_2024_06_14': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/EventTypeOutput_2024_06_14',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateIcsFeedInputDto': {
                        'properties': {
                            'readOnly': {
                                'default': true,
                                'description': 'Whether to allowing writing to the calendar or not',
                                'example': false,
                                'type': 'boolean',
                            },
                            'urls': {
                                'description': 'An array of ICS URLs',
                                'example': ['https://cal.com/ics/feed.ics', 'http://cal.com/ics/feed.ics'],
                                'items': {
                                    'example': 'https://cal.com/ics/feed.ics',
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['urls'],
                        'type': 'object',
                    },
                    'CreateIcsFeedOutput': {
                        'properties': {
                            'appId': {
                                'description': 'The slug of the calendar',
                                'example': 'ics-feed',
                                'nullable': true,
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The id of the calendar credential',
                                'example': 1234567890,
                                'type': 'number',
                            },
                            'invalid': {
                                'description': 'Whether the calendar credentials are valid or not',
                                'example': false,
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'teamId': {
                                'description': 'The team id of the user that created the calendar',
                                'example': 1234567890,
                                'nullable': true,
                                'type': 'integer',
                            },
                            'type': {
                                'description': 'The type of the calendar',
                                'example': 'ics-feed_calendar',
                                'type': 'string',
                            },
                            'userId': {
                                'description': 'The user id of the user that created the calendar',
                                'example': 1234567890,
                                'nullable': true,
                                'type': 'integer',
                            },
                        },
                        'required': ['id', 'type', 'userId', 'teamId', 'appId', 'invalid'],
                        'type': 'object',
                    },
                    'CreateIcsFeedOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/CreateIcsFeedOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateInstantBookingInput_2024_08_13': {
                        'properties': {
                            'attendee': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Attendee',
                                    },
                                ],
                                'description': 'The attendee\'s details.',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values for custom booking fields added by you.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'eventTypeId': {
                                'description': 'The ID of the event type that is booked. Required unless eventTypeSlug and username are provided as an alternative to identifying the event type.',
                                'example': 123,
                                'type': 'number',
                            },
                            'eventTypeSlug': {
                                'description': 'The slug of the event type. Required along with username / teamSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'my-event-type',
                                'type': 'string',
                            },
                            'guests': {
                                'description': 'An optional list of guest emails attending the event.',
                                'example': ['guest1@example.com', 'guest2@example.com'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'instant': {
                                'description': 'Flag indicating if the booking is an instant booking. Only available for team events.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'lengthInMinutes': {
                                'description': 'If it is an event type that has multiple possible lengths that attendee can pick from, you can pass the desired booking length here.\n    If not provided then event type default length will be used for the booking.',
                                'example': 30,
                                'type': 'number',
                            },
                            'location': {
                                'description': 'One of the event type locations. If instead of passing one of the location objects as required by schema you are still passing a string please use an object.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingInputAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputIntegrationLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputLinkLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputPhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13',
                                    },
                                ],
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - use \'location\' instead. Meeting URL just for this booking. Displayed in email and calendar event. If not provided then cal video link will be generated.',
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and string values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'organizationSlug': {
                                'description': 'The organization slug. Optional, only used when booking with eventTypeSlug + username or eventTypeSlug + teamSlug.',
                                'example': 'acme-corp',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'The start time of the booking in ISO 8601 format in UTC timezone.',
                                'example': '2024-08-13T09:00:00Z',
                                'type': 'string',
                            },
                            'teamSlug': {
                                'description': 'Team slug for team that owns event type for which slots are fetched. Required along with eventTypeSlug and optionally organizationSlug if the team is part of organization',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                            'username': {
                                'description': 'The username of the event owner. Required along with eventTypeSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                        },
                        'required': ['start', 'attendee', 'instant'],
                        'type': 'object',
                    },
                    'CreateManagedOrganizationOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ManagedOrganizationWithApiKeyOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateManagedUserData': {
                        'properties': {
                            'accessToken': {
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                'type': 'string',
                            },
                            'accessTokenExpiresAt': {
                                'type': 'number',
                            },
                            'refreshToken': {
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                'type': 'string',
                            },
                            'refreshTokenExpiresAt': {
                                'type': 'number',
                            },
                            'user': {
                                '$ref': '#/components/schemas/ManagedUserOutput',
                            },
                        },
                        'required': ['accessToken', 'refreshToken', 'user', 'accessTokenExpiresAt', 'refreshTokenExpiresAt'],
                        'type': 'object',
                    },
                    'CreateManagedUserInput': {
                        'properties': {
                            'avatarUrl': {
                                'description': 'URL of the user\'s avatar image',
                                'example': 'https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png',
                                'type': 'string',
                            },
                            'bio': {
                                'description': 'Bio',
                                'example': 'I am a bio',
                                'type': 'string',
                            },
                            'email': {
                                'example': 'alice@example.com',
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
                                'example': 'en',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Managed user\'s name is used in emails',
                                'example': 'Alice Smith',
                                'type': 'string',
                            },
                            'timeFormat': {
                                'description': 'Must be a number 12 or 24',
                                'enum': [12, 24],
                                'example': 12,
                                'type': 'number',
                            },
                            'timeZone': {
                                'description': 'Timezone is used to create user\'s default schedule from Monday to Friday from 9AM to 5PM. If it is not passed then user does not have\n      a default schedule and it must be created manually via the /schedules endpoint. Until the schedule is created, the user can\'t access availability atom to set his / her availability nor booked.\n      It will default to Europe/London if not passed.',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'weekStart': {
                                'enum': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'required': ['email', 'name'],
                        'type': 'object',
                    },
                    'CreateManagedUserOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/CreateManagedUserData',
                            },
                            'error': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateOAuthClientInput': {
                        'properties': {
                            'areDefaultEventTypesEnabled': {
                                'default': false,
                                'description': 'If true, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Set this as false if you want to create a managed user and then manually create event types for the user.',
                                'type': 'boolean',
                            },
                            'areEmailsEnabled': {
                                'type': 'boolean',
                            },
                            'bookingCancelRedirectUri': {
                                'type': 'string',
                            },
                            'bookingRedirectUri': {
                                'type': 'string',
                            },
                            'bookingRescheduleRedirectUri': {
                                'type': 'string',
                            },
                            'logo': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'permissions': {
                                'description': 'Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"]. Use ["*"] to grant all permissions.',
                                'items': {
                                    'enum': [
                                        'EVENT_TYPE_READ',
                                        'EVENT_TYPE_WRITE',
                                        'BOOKING_READ',
                                        'BOOKING_WRITE',
                                        'SCHEDULE_READ',
                                        'SCHEDULE_WRITE',
                                        'APPS_READ',
                                        'APPS_WRITE',
                                        'PROFILE_READ',
                                        'PROFILE_WRITE',
                                        '*',
                                    ],
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'redirectUris': {
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['name', 'redirectUris', 'permissions'],
                        'type': 'object',
                    },
                    'CreateOAuthClientOutput': {
                        'properties': {
                            'clientId': {
                                'example': 'clsx38nbl0001vkhlwin9fmt0',
                                'type': 'string',
                            },
                            'clientSecret': {
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2F1dGgtY2xpZW50Iiwi',
                                'type': 'string',
                            },
                        },
                        'required': ['clientId', 'clientSecret'],
                        'type': 'object',
                    },
                    'CreateOAuthClientResponseDto': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/CreateOAuthClientOutput',
                                    },
                                ],
                                'example': {
                                    'clientId': 'clsx38nbl0001vkhlwin9fmt0',
                                    'clientSecret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2F1dGgtY2xpZW50Iiwi',
                                },
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateOrganizationAttributeInput': {
                        'properties': {
                            'enabled': {
                                'type': 'boolean',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'options': {
                                'items': {
                                    '$ref': '#/components/schemas/CreateOrganizationAttributeOptionInput',
                                },
                                'type': 'array',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'type': {
                                'enum': ['TEXT', 'NUMBER', 'SINGLE_SELECT', 'MULTI_SELECT'],
                                'type': 'string',
                            },
                        },
                        'required': ['name', 'slug', 'type', 'options'],
                        'type': 'object',
                    },
                    'CreateOrganizationAttributeOptionInput': {
                        'properties': {
                            'slug': {
                                'type': 'string',
                            },
                            'value': {
                                'type': 'string',
                            },
                        },
                        'required': ['value', 'slug'],
                        'type': 'object',
                    },
                    'CreateOrganizationAttributesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/Attribute',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateOrganizationInput': {
                        'properties': {
                            'apiKeyDaysValid': {
                                'default': 30,
                                'description': 'For how many days is managed organization api key valid. Defaults to 30 days.',
                                'example': 60,
                                'minimum': 1,
                                'type': 'number',
                            },
                            'apiKeyNeverExpires': {
                                'description': 'If true, organization api key never expires.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here.\nMetadata must have at most 50 keys, each key up to 40 characters.\nValues can be strings (up to 500 characters), numbers, or booleans.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Name of the organization',
                                'example': 'CalTeam',
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'Organization slug in kebab-case - if not provided will be generated automatically based on name.',
                                'example': 'cal-tel',
                                'type': 'string',
                            },
                        },
                        'required': ['name'],
                        'type': 'object',
                    },
                    'CreateOrganizationUserInput': {
                        'properties': {
                            'appTheme': {
                                'description': 'Application theme',
                                'example': 'light',
                                'nullable': true,
                                'type': 'string',
                            },
                            'autoAccept': {
                                'default': true,
                                'type': 'boolean',
                            },
                            'avatarUrl': {
                                'description': 'Avatar URL',
                                'example': 'https://example.com/avatar.jpg',
                                'type': 'string',
                            },
                            'bio': {
                                'description': 'Bio',
                                'example': 'I am a bio',
                                'type': 'string',
                            },
                            'brandColor': {
                                'description': 'Brand color in HEX format',
                                'example': '#FFFFFF',
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'description': 'Dark brand color in HEX format',
                                'example': '#000000',
                                'type': 'string',
                            },
                            'defaultScheduleId': {
                                'description': 'Default schedule ID',
                                'example': 1,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'email': {
                                'description': 'User email address',
                                'example': 'user@example.com',
                                'type': 'string',
                            },
                            'hideBranding': {
                                'description': 'Hide branding',
                                'example': false,
                                'type': 'boolean',
                            },
                            'locale': {
                                'default': 'en',
                                'description': 'Locale',
                                'example': 'en',
                                'nullable': true,
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'organizationRole': {
                                'default': 'MEMBER',
                                'enum': ['MEMBER', 'ADMIN', 'OWNER'],
                                'type': 'string',
                            },
                            'theme': {
                                'description': 'Theme',
                                'example': 'dark',
                                'nullable': true,
                                'type': 'string',
                            },
                            'timeFormat': {
                                'description': 'Time format',
                                'example': 24,
                                'type': 'number',
                            },
                            'timeZone': {
                                'description': 'Time zone',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'username': {
                                'description': 'Username',
                                'example': 'user123',
                                'type': 'string',
                            },
                            'weekday': {
                                'description': 'Preferred weekday',
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'required': ['email'],
                        'type': 'object',
                    },
                    'CreateOrgMembershipDto': {
                        'properties': {
                            'accepted': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'role': {
                                'default': 'MEMBER',
                                'description': 'If you are platform customer then managed users should only have MEMBER role.',
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['userId', 'role'],
                        'type': 'object',
                    },
                    'CreateOrgMembershipOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrganizationMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateOrgTeamDto': {
                        'properties': {
                            'appIconLogo': {
                                'type': 'string',
                            },
                            'appLogo': {
                                'type': 'string',
                            },
                            'autoAcceptCreator': {
                                'default': true,
                                'description': 'If you are a platform customer, don\'t pass \'false\', because then team creator won\'t be able to create team event types.',
                                'type': 'boolean',
                            },
                            'bannerUrl': {
                                'description': 'URL of the teams banner image which is shown on booker',
                                'example': 'https://i.cal.com/api/avatar/949be534-7a88-4185-967c-c020b0c0bef3.png',
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'calVideoLogo': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'hideBookATeamMember': {
                                'type': 'boolean',
                            },
                            'hideBranding': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'isPrivate': {
                                'type': 'boolean',
                            },
                            'logoUrl': {
                                'description': 'URL of the teams logo image',
                                'example': 'https://i.cal.com/api/avatar/b0b58752-68ad-4c0d-8024-4fa382a77752.png',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here.\nMetadata must have at most 50 keys, each key up to 40 characters.\nValues can be strings (up to 500 characters), numbers, or booleans.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Name of the team',
                                'example': 'CalTeam',
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'Team slug in kebab-case - if not provided will be generated automatically based on name.',
                                'example': 'caltel',
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'default': 'Europe/London',
                                'description': 'Timezone is used to create teams\'s default schedule from Monday to Friday from 9AM to 5PM. It will default to Europe/London if not passed.',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'weekStart': {
                                'default': 'Sunday',
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'required': ['name'],
                        'type': 'object',
                    },
                    'CreateOrgTeamMembershipDto': {
                        'properties': {
                            'accepted': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'role': {
                                'default': 'MEMBER',
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['userId', 'role'],
                        'type': 'object',
                    },
                    'CreateOutOfOfficeEntryDto': {
                        'properties': {
                            'end': {
                                'description': 'The end date and time of the out of office period in ISO 8601 format in UTC timezone.',
                                'example': '2023-05-10T23:59:59.999Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'notes': {
                                'description': 'Optional notes for the out of office entry.',
                                'example': 'Vacation in Hawaii',
                                'type': 'string',
                            },
                            'reason': {
                                'description': 'the reason for the out of office entry, if applicable',
                                'enum': ['unspecified', 'vacation', 'travel', 'sick', 'public_holiday'],
                                'example': 'vacation',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'The start date and time of the out of office period in ISO 8601 format in UTC timezone.',
                                'example': '2023-05-01T00:00:00.000Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'toUserId': {
                                'description': 'The ID of the user covering for the out of office period, if applicable.',
                                'example': 2,
                                'type': 'number',
                            },
                        },
                        'required': ['start', 'end'],
                        'type': 'object',
                    },
                    'CreatePhoneCallInput': {
                        'properties': {
                            'beginMessage': {
                                'description': 'Begin message',
                                'type': 'string',
                            },
                            'calApiKey': {
                                'description': 'CAL API Key',
                                'type': 'string',
                            },
                            'enabled': {
                                'default': true,
                                'description': 'Enabled status',
                                'type': 'object',
                            },
                            'generalPrompt': {
                                'description': 'General prompt',
                                'type': 'string',
                            },
                            'guestCompany': {
                                'description': 'Guest company',
                                'type': 'string',
                            },
                            'guestEmail': {
                                'description': 'Guest email',
                                'type': 'string',
                            },
                            'guestName': {
                                'description': 'Guest name',
                                'type': 'string',
                            },
                            'numberToCall': {
                                'description': 'Number to call',
                                'pattern': '/^\\+[1-9]\\d{1,14}$/',
                                'type': 'string',
                            },
                            'schedulerName': {
                                'description': 'Scheduler name',
                                'type': 'string',
                            },
                            'templateType': {
                                'default': 'CUSTOM_TEMPLATE',
                                'description': 'Template type',
                                'enum': ['CHECK_IN_APPOINTMENT', 'CUSTOM_TEMPLATE'],
                                'type': 'string',
                            },
                            'yourPhoneNumber': {
                                'description': 'Your phone number',
                                'pattern': '/^\\+[1-9]\\d{1,14}$/',
                                'type': 'string',
                            },
                        },
                        'required': ['yourPhoneNumber', 'numberToCall', 'calApiKey', 'enabled', 'templateType'],
                        'type': 'object',
                    },
                    'CreatePhoneCallOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/Data',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateRecurringBookingInput_2024_08_13': {
                        'properties': {
                            'attendee': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Attendee',
                                    },
                                ],
                                'description': 'The attendee\'s details.',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values for custom booking fields added by you.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'eventTypeId': {
                                'description': 'The ID of the event type that is booked. Required unless eventTypeSlug and username are provided as an alternative to identifying the event type.',
                                'example': 123,
                                'type': 'number',
                            },
                            'eventTypeSlug': {
                                'description': 'The slug of the event type. Required along with username / teamSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'my-event-type',
                                'type': 'string',
                            },
                            'guests': {
                                'description': 'An optional list of guest emails attending the event.',
                                'example': ['guest1@example.com', 'guest2@example.com'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'lengthInMinutes': {
                                'description': 'If it is an event type that has multiple possible lengths that attendee can pick from, you can pass the desired booking length here.\n    If not provided then event type default length will be used for the booking.',
                                'example': 30,
                                'type': 'number',
                            },
                            'location': {
                                'description': 'One of the event type locations. If instead of passing one of the location objects as required by schema you are still passing a string please use an object.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingInputAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputIntegrationLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputLinkLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputPhoneLocation_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13',
                                    },
                                ],
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - use \'location\' instead. Meeting URL just for this booking. Displayed in email and calendar event. If not provided then cal video link will be generated.',
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and string values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'organizationSlug': {
                                'description': 'The organization slug. Optional, only used when booking with eventTypeSlug + username or eventTypeSlug + teamSlug.',
                                'example': 'acme-corp',
                                'type': 'string',
                            },
                            'recurrenceCount': {
                                'description': 'The number of recurrences. If not provided then event type recurrence count will be used. Can\'t be more than\n    event type recurrence count',
                                'example': 5,
                                'type': 'number',
                            },
                            'start': {
                                'description': 'The start time of the booking in ISO 8601 format in UTC timezone.',
                                'example': '2024-08-13T09:00:00Z',
                                'type': 'string',
                            },
                            'teamSlug': {
                                'description': 'Team slug for team that owns event type for which slots are fetched. Required along with eventTypeSlug and optionally organizationSlug if the team is part of organization',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                            'username': {
                                'description': 'The username of the event owner. Required along with eventTypeSlug and optionally organizationSlug if eventTypeId is not provided.',
                                'example': 'john-doe',
                                'type': 'string',
                            },
                        },
                        'required': ['start', 'attendee'],
                        'type': 'object',
                    },
                    'CreateRecurringSeatedBookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/SeatedAttendee',
                                },
                                'type': 'array',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'recurringBookingUid': {
                                'example': 'recurring_uid_987',
                                'type': 'string',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'seatUid': {
                                'example': '3be561a9-31f1-4b8e-aefc-9d9a085f0dd1',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'seatUid',
                            'attendees',
                            'recurringBookingUid',
                        ],
                        'type': 'object',
                    },
                    'CreateScheduleInput_2024_06_11': {
                        'properties': {
                            'availability': {
                                'description': 'Each object contains days and times when the user is available. If not passed, the default availability is Monday to Friday from 09:00 to 17:00.',
                                'example': [
                                    {
                                        'days': ['Monday', 'Tuesday'],
                                        'endTime': '19:00',
                                        'startTime': '17:00',
                                    },
                                    {
                                        'days': ['Wednesday', 'Thursday'],
                                        'endTime': '20:00',
                                        'startTime': '16:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleAvailabilityInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'isDefault': {
                                'description': 'Each user should have 1 default schedule. If you specified `timeZone` when creating managed user, then the default schedule will be created with that timezone.\n    Default schedule means that if an event type is not tied to a specific schedule then the default schedule is used.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'name': {
                                'example': 'Catch up hours',
                                'type': 'string',
                            },
                            'overrides': {
                                'description': 'Need to change availability for a specific date? Add an override.',
                                'example': [
                                    {
                                        'date': '2024-05-20',
                                        'endTime': '21:00',
                                        'startTime': '18:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleOverrideInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'timeZone': {
                                'description': 'Timezone is used to calculate available times when an event using the schedule is booked.',
                                'example': 'Europe/Rome',
                                'type': 'string',
                            },
                        },
                        'required': ['name', 'timeZone', 'isDefault'],
                        'type': 'object',
                    },
                    'CreateScheduleOutput_2024_06_11': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput_2024_06_11',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateSeatedBookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/SeatedAttendee',
                                },
                                'type': 'array',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'seatUid': {
                                'example': '3be561a9-31f1-4b8e-aefc-9d9a085f0dd1',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'seatUid',
                            'attendees',
                        ],
                        'type': 'object',
                    },
                    'CreateTeamEventTypeInput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'description': 'Time spaces that can be appended after an event to give more time after it.',
                                'type': 'number',
                            },
                            'assignAllTeamMembers': {
                                'description': 'If true, all current and future team members will be assigned to this event type',
                                'type': 'boolean',
                            },
                            'beforeEventBuffer': {
                                'description': 'Time spaces that can be prepended before an event to give more time before it.',
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                                    },
                                ],
                                'description': 'Should booker have week, month or column view. Specify default layout and enabled layouts user can pick.',
                            },
                            'bookingFields': {
                                'description': 'Custom fields that can be added to the booking form when the event is booked by someone. By default booking form has name and email field.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/UrlFieldInput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'description': 'Limit how many times this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsCount_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingLimitsDuration': {
                                'description': 'Limit total amount of time that this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsDuration_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'description': 'Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseConfirmationPolicy_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'customName': {
                                'description': 'Customizable event name with valid variables: \n      {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name}, \n      {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION}, \n      {HOST/ATTENDEE}, {HOST}, {ATTENDEE}, {USER}',
                                'example': '{Event type title} between {Organiser} and {Scheduler}',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of the Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'description': 'If true, person booking this event can\'t add guests via their emails.',
                                'type': 'boolean',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'hosts': {
                                'description': 'Hosts contain specific team members you want to assign to this event type, but if you want to assign all team members, use `assignAllTeamMembers: true` instead and omit this field. For platform customers the hosts can include userIds only of managed users.',
                                'items': {
                                    '$ref': '#/components/schemas/Host',
                                },
                                'type': 'array',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'description': 'Locations where the event will take place. If not provided, cal video link will be used as the location.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/InputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeePhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeDefinedLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputOrganizersDefaultApp_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'minimumBookingNotice': {
                                'description': 'Minimum number of minutes before the event that a booking can be made.',
                                'type': 'number',
                            },
                            'offsetStart': {
                                'description': 'Offset timeslots shown to bookers by a specified number of minutes',
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'description': 'This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.',
                                'type': 'boolean',
                            },
                            'recurrence': {
                                'description': 'Create a recurring event type.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'description': 'If you want that this event has different schedule than user\'s default one you can specify it here.',
                                'type': 'number',
                            },
                            'schedulingType': {
                                'description': 'The scheduling type for the team event - collective, roundRobin or managed.',
                                'enum': ['collective', 'roundRobin', 'managed'],
                                'example': 'collective',
                                'type': 'string',
                            },
                            'seats': {
                                'description': 'Create an event type with multiple seats.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Seats_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'slotInterval': {
                                'description': 'Number representing length of each slot when event is booked. By default it equal length of the event type.\n      If event length is 60 minutes then we would have slots 9AM, 10AM, 11AM etc. but if it was changed to 30 minutes then\n      we would have slots 9AM, 9:30AM, 10AM, 10:30AM etc. as the available times to book the 60 minute event.',
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'description': 'A valid URL where the booker will redirect to, once the booking is completed successfully',
                                'example': 'https://masterchief.com/argentina/flan/video/9129412',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                        },
                        'required': ['lengthInMinutes', 'title', 'slug', 'schedulingType'],
                        'type': 'object',
                    },
                    'CreateTeamEventTypeOutput': {
                        'properties': {
                            'data': {
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                                        },
                                        'type': 'array',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateTeamInput': {
                        'properties': {
                            'appIconLogo': {
                                'type': 'string',
                            },
                            'appLogo': {
                                'type': 'string',
                            },
                            'autoAcceptCreator': {
                                'default': true,
                                'description': 'If you are a platform customer, don\'t pass \'false\', because then team creator won\'t be able to create team event types.',
                                'type': 'boolean',
                            },
                            'bannerUrl': {
                                'description': 'URL of the teams banner image which is shown on booker',
                                'example': 'https://i.cal.com/api/avatar/949be534-7a88-4185-967c-c020b0c0bef3.png',
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'calVideoLogo': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'hideBookATeamMember': {
                                'type': 'boolean',
                            },
                            'hideBranding': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'isPrivate': {
                                'type': 'boolean',
                            },
                            'logoUrl': {
                                'description': 'URL of the teams logo image',
                                'example': 'https://i.cal.com/api/avatar/b0b58752-68ad-4c0d-8024-4fa382a77752.png',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here.\nMetadata must have at most 50 keys, each key up to 40 characters.\nValues can be strings (up to 500 characters), numbers, or booleans.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Name of the team',
                                'example': 'CalTeam',
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'Team slug in kebab-case - if not provided will be generated automatically based on name.',
                                'example': 'caltel',
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'default': 'Europe/London',
                                'description': 'Timezone is used to create teams\'s default schedule from Monday to Friday from 9AM to 5PM. It will default to Europe/London if not passed.',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'weekStart': {
                                'default': 'Sunday',
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'required': ['name'],
                        'type': 'object',
                    },
                    'CreateTeamMembershipInput': {
                        'properties': {
                            'accepted': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'role': {
                                'default': 'MEMBER',
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['userId'],
                        'type': 'object',
                    },
                    'CreateTeamMembershipOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateTeamOutput': {
                        'properties': {
                            'data': {
                                'description': 'Either an Output object or a TeamOutputDto.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Output',
                                    },
                                    {
                                        '$ref': '#/components/schemas/TeamOutputDto',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'CreateWebhookInputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'triggers': {
                                'enum': [
                                    'BOOKING_CREATED',
                                    'BOOKING_PAYMENT_INITIATED',
                                    'BOOKING_PAID',
                                    'BOOKING_RESCHEDULED',
                                    'BOOKING_REQUESTED',
                                    'BOOKING_CANCELLED',
                                    'BOOKING_REJECTED',
                                    'BOOKING_NO_SHOW_UPDATED',
                                    'FORM_SUBMITTED',
                                    'MEETING_ENDED',
                                    'MEETING_STARTED',
                                    'RECORDING_READY',
                                    'INSTANT_MEETING',
                                    'RECORDING_TRANSCRIPTION_GENERATED',
                                    'OOO_CREATED',
                                    'AFTER_HOSTS_CAL_VIDEO_NO_SHOW',
                                    'AFTER_GUESTS_CAL_VIDEO_NO_SHOW',
                                    'FORM_SUBMITTED_NO_EVENT',
                                ],
                                'example': [
                                    'BOOKING_CREATED',
                                    'BOOKING_RESCHEDULED',
                                    'BOOKING_CANCELLED',
                                    'BOOKING_CONFIRMED',
                                    'BOOKING_REJECTED',
                                    'BOOKING_COMPLETED',
                                    'BOOKING_NO_SHOW',
                                    'BOOKING_REOPENED',
                                ],
                                'type': 'string',
                            },
                        },
                        'required': ['active', 'subscriberUrl', 'triggers'],
                        'type': 'object',
                    },
                    'Data': {
                        'properties': {
                            'agentId': {
                                'type': 'string',
                            },
                            'callId': {
                                'type': 'string',
                            },
                        },
                        'required': ['callId'],
                        'type': 'object',
                    },
                    'DeclineBookingInput_2024_08_13': {
                        'properties': {
                            'reason': {
                                'description': 'Reason for declining a booking that requires a confirmation',
                                'example': 'Host has to take another call',
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'DefaultConferencingAppsOutputDto': {
                        'properties': {
                            'appLink': {
                                'type': 'string',
                            },
                            'appSlug': {
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'DelegationCredentialOutput': {
                        'properties': {
                            'createdAt': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'domain': {
                                'type': 'string',
                            },
                            'enabled': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'string',
                            },
                            'organizationId': {
                                'type': 'number',
                            },
                            'updatedAt': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'workspacePlatform': {
                                '$ref': '#/components/schemas/WorkspacePlatformDto',
                            },
                        },
                        'required': [
                            'id',
                            'enabled',
                            'domain',
                            'organizationId',
                            'workspacePlatform',
                            'createdAt',
                            'updatedAt',
                        ],
                        'type': 'object',
                    },
                    'DeleteAttributeOptionOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OptionOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteCalendarCredentialsInputBodyDto': {
                        'properties': {
                            'id': {
                                'description': 'Credential ID of the calendar to delete, as returned by the /calendars endpoint',
                                'example': 10,
                                'type': 'integer',
                            },
                        },
                        'required': ['id'],
                        'type': 'object',
                    },
                    'DeleteData_2024_06_14': {
                        'properties': {
                            'id': {
                                'example': 1,
                                'type': 'number',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'lengthInMinutes', 'title', 'slug'],
                        'type': 'object',
                    },
                    'DeletedCalendarCredentialsOutputDto': {
                        'properties': {
                            'appId': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'invalid': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'teamId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'type': {
                                'type': 'string',
                            },
                            'userId': {
                                'nullable': true,
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'type', 'userId', 'teamId', 'appId', 'invalid'],
                        'type': 'object',
                    },
                    'DeletedCalendarCredentialsOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DeletedCalendarCredentialsOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteEventTypeOutput_2024_06_14': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DeleteData_2024_06_14',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteManyWebhooksOutputResponseDto': {
                        'properties': {
                            'data': {
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteOrganizationAttributesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/Attribute',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteOrgMembership': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrganizationMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteScheduleOutput_2024_06_11': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'DeleteTeamEventTypeOutput': {
                        'properties': {
                            'data': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DeleteTeamMembershipOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'DestinationCalendar': {
                        'properties': {
                            'credentialId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'delegationCredentialId': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'eventTypeId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'id': {
                                'type': 'object',
                            },
                            'integration': {
                                'type': 'string',
                            },
                            'integrationTitle': {
                                'type': 'string',
                            },
                            'name': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'primary': {
                                'type': 'boolean',
                            },
                            'primaryEmail': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'readOnly': {
                                'type': 'boolean',
                            },
                            'userId': {
                                'nullable': true,
                                'type': 'number',
                            },
                        },
                        'required': [
                            'id',
                            'integration',
                            'externalId',
                            'primaryEmail',
                            'userId',
                            'eventTypeId',
                            'credentialId',
                        ],
                        'type': 'object',
                    },
                    'DestinationCalendar_2024_06_14': {
                        'properties': {
                            'externalId': {
                                'description': 'The external ID of the destination calendar. Refer to the /api/v2/calendars endpoint to retrieve the external IDs of your connected calendars.',
                                'type': 'string',
                            },
                            'integration': {
                                'description': 'The integration type of the destination calendar. Refer to the /api/v2/calendars endpoint to retrieve the integration type of your connected calendars.',
                                'type': 'string',
                            },
                        },
                        'required': ['integration', 'externalId'],
                        'type': 'object',
                    },
                    'DestinationCalendarsInputBodyDto': {
                        'properties': {
                            'delegationCredentialId': {
                                'type': 'string',
                            },
                            'externalId': {
                                'description': 'Unique identifier used to represent the specific calendar, as returned by the /calendars endpoint',
                                'example': 'https://caldav.icloud.com/26962146906/calendars/1644422A-1945-4438-BBC0-4F0Q23A57R7S/',
                                'type': 'string',
                            },
                            'integration': {
                                'description': 'The calendar service you want to integrate, as returned by the /calendars endpoint',
                                'enum': ['apple_calendar', 'google_calendar', 'office365_calendar'],
                                'example': 'apple_calendar',
                                'type': 'string',
                            },
                        },
                        'required': ['integration', 'externalId'],
                        'type': 'object',
                    },
                    'DestinationCalendarsOutputDto': {
                        'properties': {
                            'credentialId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'integration': {
                                'type': 'string',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['userId', 'integration', 'externalId', 'credentialId'],
                        'type': 'object',
                    },
                    'DestinationCalendarsOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DestinationCalendarsOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'Disabled_2024_06_14': {
                        'properties': {
                            'disabled': {
                                'default': false,
                                'description': 'Indicates if the option is disabled',
                                'example': true,
                                'type': 'boolean',
                            },
                        },
                        'required': ['disabled'],
                        'type': 'object',
                    },
                    'DisconnectConferencingAppOutputResponseDto': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'EmailDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&email=bob@gmail.com`,      the email field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'Can be set to true only for organization team event types and if you also pass booking field {type: "phone", slug: "attendeePhoneNumber", required: true, hidden: false, label: "whatever label"} of booking field type PhoneFieldInput_2024_06_14 - this is done\n      to enable phone only bookings where during the booking attendee can provide only their phone number and not provide email, so you must pass to the email booking field {hidden: true, required: false}.\n      If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'description': 'Can be set to false only for organization team event types and if you also pass booking field {type: "phone", slug: "attendeePhoneNumber", required: true, hidden: false, label: "whatever label"} of booking field type PhoneFieldInput_2024_06_14 - this is done\n      to enable phone only bookings where during the booking attendee can provide only their phone number and not provide email, so you must pass to the email booking field {hidden: true, required: false}.\n      If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'object',
                            },
                            'type': {
                                'description': 'only allowed value for type is `email`',
                                'example': 'email',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'label', 'placeholder'],
                        'type': 'object',
                    },
                    'EmailDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&email=bob@gmail.com`,      the email field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both. Can only be hidden\n      for organization team event types when also providing attendee phone number booking field.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'default': true,
                                'description': 'Can be set to false only for organization team event types and if you also pass booking field {type: "phone", slug: "attendeePhoneNumber", required: true, hidden: false, label: "whatever label"} of booking field type PhoneFieldInput_2024_06_14 - this is done\n      to enable phone only bookings where during the booking attendee can provide only their phone number and not provide email, so you must pass to the email booking field {hidden: true, required: false}.\n      If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'object',
                            },
                            'slug': {
                                'default': 'email',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'email',
                                'description': 'only allowed value for type is `email`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'email',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'isDefault', 'slug'],
                        'type': 'object',
                    },
                    'EventType': {
                        'properties': {
                            'id': {
                                'example': 1,
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'some-event',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'slug'],
                        'type': 'object',
                    },
                    'EventTypeColor_2024_06_14': {
                        'properties': {
                            'darkThemeHex': {
                                'description': 'Color used for event types in dark theme',
                                'example': '#fafafa',
                                'type': 'string',
                            },
                            'lightThemeHex': {
                                'description': 'Color used for event types in light theme',
                                'example': '#292929',
                                'type': 'string',
                            },
                        },
                        'required': ['lightThemeHex', 'darkThemeHex'],
                        'type': 'object',
                    },
                    'EventTypeOutput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'example': 0,
                                'type': 'number',
                            },
                            'beforeEventBuffer': {
                                'example': 0,
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                            },
                            'bookingFields': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/LocationDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/UrlFieldOutput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'type': 'object',
                            },
                            'bookingLimitsDuration': {
                                'type': 'object',
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'type': 'object',
                            },
                            'currency': {
                                'type': 'string',
                            },
                            'customName': {
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'type': 'boolean',
                            },
                            'forwardParamsSuccessRedirect': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'id': {
                                'example': 1,
                                'type': 'number',
                            },
                            'isInstantEvent': {
                                'type': 'boolean',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'type': 'number',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/OutputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputOrganizersDefaultAppLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputUnknownLocation_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'metadata': {
                                'type': 'object',
                            },
                            'minimumBookingNotice': {
                                'example': 0,
                                'type': 'number',
                            },
                            'offsetStart': {
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'type': 'boolean',
                            },
                            'ownerId': {
                                'example': 10,
                                'type': 'number',
                            },
                            'price': {
                                'type': 'number',
                            },
                            'recurrence': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                ],
                                'nullable': true,
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'seats': {
                                '$ref': '#/components/schemas/Seats_2024_06_14',
                            },
                            'seatsPerTimeSlot': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'seatsShowAvailabilityCount': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'slotInterval': {
                                'example': 60,
                                'nullable': true,
                                'type': 'object',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                            'users': {
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'required': [
                            'id',
                            'lengthInMinutes',
                            'title',
                            'slug',
                            'description',
                            'locations',
                            'bookingFields',
                            'disableGuests',
                            'recurrence',
                            'metadata',
                            'price',
                            'currency',
                            'lockTimeZoneToggleOnBookingPage',
                            'forwardParamsSuccessRedirect',
                            'successRedirectUrl',
                            'isInstantEvent',
                            'scheduleId',
                            'ownerId',
                            'users',
                        ],
                        'type': 'object',
                    },
                    'EventTypeTeam': {
                        'properties': {
                            'bannerUrl': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'logoUrl': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'weekStart': {
                                'type': 'string',
                            },
                        },
                        'required': ['id'],
                        'type': 'object',
                    },
                    'EventTypeWebhookOutputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'eventTypeId': {
                                'type': 'number',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'triggers': {
                                'items': {
                                    'type': 'object',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['payloadTemplate', 'eventTypeId', 'id', 'triggers', 'subscriberUrl', 'active'],
                        'type': 'object',
                    },
                    'EventTypeWebhookOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/EventTypeWebhookOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'EventTypeWebhooksOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/EventTypeWebhookOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetAllAttributeAssignedOptionOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/AssignedOptionOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetAllAttributeOptionOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/OptionOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetAllOrgMemberships': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrganizationMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking data, which can be either a BookingOutput object, a RecurringBookingOutput object, or an array of RecurringBookingOutput objects',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                    {
                                        '$ref': '#/components/schemas/GetSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/GetRecurringSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/GetRecurringSeatedBookingOutput_2024_08_13',
                                        },
                                        'type': 'array',
                                    },
                                ],
                            },
                            'error': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetBookingsOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Array of booking data, which can contain either BookingOutput objects or RecurringBookingOutput objects',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GetSeatedBookingOutput_2024_08_13',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GetRecurringSeatedBookingOutput_2024_08_13',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'error': {
                                'type': 'object',
                            },
                            'pagination': {
                                '$ref': '#/components/schemas/PaginationMetaDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data', 'pagination'],
                        'type': 'object',
                    },
                    'GetBusyTimesOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/BusyTimesOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetConferencingAppsOauthUrlResponseDto': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'GetDefaultConferencingAppOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DefaultConferencingAppsOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'GetDefaultScheduleOutput_2024_06_11': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput_2024_06_11',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetEventTypeOutput_2024_06_14': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/EventTypeOutput_2024_06_14',
                                    },
                                ],
                                'nullable': true,
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetEventTypesOutput_2024_06_14': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/EventTypeOutput_2024_06_14',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetManagedOrganizationOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ManagedOrganizationOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetManagedOrganizationsOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/ManagedOrganizationOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetManagedUserOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ManagedUserOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetManagedUsersOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/ManagedUserOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetMeOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/MeOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOAuthClientResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/PlatformOAuthClientDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOAuthClientsResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/PlatformOAuthClientDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOptionUserOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/GetOptionUserOutputData',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOptionUserOutputData': {
                        'properties': {
                            'attributeId': {
                                'description': 'The ID of the attribute',
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The ID of the option assigned to the user',
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'The slug of the option',
                                'type': 'string',
                            },
                            'value': {
                                'description': 'The value of the option',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'attributeId', 'value', 'slug'],
                        'type': 'object',
                    },
                    'GetOrganizationAttributesOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/Attribute',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOrganizationUserOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/GetOrgUsersWithProfileOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOrganizationUsersResponseDTO': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/GetOrgUsersWithProfileOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOrgMembership': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrganizationMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetOrgUsersWithProfileOutput': {
                        'properties': {
                            'allowDynamicBooking': {
                                'description': 'Whether dynamic booking is allowed for the user',
                                'example': true,
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'appTheme': {
                                'description': 'The app theme of the user',
                                'example': 'light',
                                'nullable': true,
                                'type': 'string',
                            },
                            'avatarUrl': {
                                'description': 'The URL of the user\'s avatar',
                                'example': 'https://example.com/avatar.jpg',
                                'nullable': true,
                                'type': 'string',
                            },
                            'bio': {
                                'description': 'The bio of the user',
                                'example': 'I am a software developer',
                                'nullable': true,
                                'type': 'string',
                            },
                            'brandColor': {
                                'description': 'The brand color of the user',
                                'example': '#ffffff',
                                'nullable': true,
                                'type': 'string',
                            },
                            'createdDate': {
                                'description': 'The date when the user was created',
                                'example': '2022-01-01T00:00:00Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'description': 'The dark brand color of the user',
                                'example': '#000000',
                                'nullable': true,
                                'type': 'string',
                            },
                            'defaultScheduleId': {
                                'description': 'The ID of the default schedule for the user',
                                'example': 1,
                                'nullable': true,
                                'type': 'number',
                            },
                            'email': {
                                'description': 'The email of the user',
                                'example': 'john@example.com',
                                'type': 'string',
                            },
                            'emailVerified': {
                                'description': 'The date when the email was verified',
                                'example': '2022-01-01T00:00:00Z',
                                'format': 'date-time',
                                'nullable': true,
                                'type': 'string',
                            },
                            'hideBranding': {
                                'description': 'Whether to hide branding for the user',
                                'example': false,
                                'type': 'boolean',
                            },
                            'id': {
                                'description': 'The ID of the user',
                                'example': 1,
                                'type': 'number',
                            },
                            'invitedTo': {
                                'description': 'The ID of the user who invited this user',
                                'example': 1,
                                'nullable': true,
                                'type': 'number',
                            },
                            'locale': {
                                'description': 'The locale of the user',
                                'example': 'en-US',
                                'nullable': true,
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'The name of the user',
                                'example': 'John Doe',
                                'nullable': true,
                                'type': 'string',
                            },
                            'profile': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/ProfileOutput',
                                    },
                                ],
                                'description': 'organization user profile, contains user data within the organizaton context',
                            },
                            'theme': {
                                'description': 'The theme of the user',
                                'example': 'default',
                                'nullable': true,
                                'type': 'string',
                            },
                            'timeFormat': {
                                'description': 'The time format of the user',
                                'example': 12,
                                'nullable': true,
                                'type': 'number',
                            },
                            'timeZone': {
                                'description': 'The time zone of the user',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'username': {
                                'description': 'The username of the user',
                                'example': 'john_doe',
                                'nullable': true,
                                'type': 'string',
                            },
                            'verified': {
                                'description': 'Whether the user is verified',
                                'example': true,
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'weekStart': {
                                'description': 'The week start day of the user',
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'email', 'timeZone', 'weekStart', 'hideBranding', 'createdDate', 'profile'],
                        'type': 'object',
                    },
                    'GetRecurringSeatedBookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/SeatedAttendee',
                                },
                                'type': 'array',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'recurringBookingUid': {
                                'example': 'recurring_uid_987',
                                'type': 'string',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'attendees',
                            'recurringBookingUid',
                        ],
                        'type': 'object',
                    },
                    'GetReservedSlotOutput_2024_09_04': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/GetReservedSlotOutput_2024_09_04',
                                    },
                                ],
                                'nullable': true,
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetRoutingFormResponsesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/RoutingFormResponseOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetRoutingFormsOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/RoutingFormOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetScheduleOutput_2024_06_11': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/ScheduleOutput_2024_06_11',
                                    },
                                ],
                                'nullable': true,
                            },
                            'error': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetSchedulesOutput_2024_06_11': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleOutput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'error': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetSeatedBookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/SeatedAttendee',
                                },
                                'type': 'array',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'attendees',
                        ],
                        'type': 'object',
                    },
                    'GetSingleAttributeOutput': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Attribute',
                                    },
                                ],
                                'nullable': true,
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamEventTypeOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamEventTypesOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamMembershipOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamMembershipsOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GetTeamsOutput': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/TeamOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'GoogleServiceAccountKeyInput': {
                        'properties': {
                            'client_email': {
                                'type': 'string',
                            },
                            'client_id': {
                                'type': 'string',
                            },
                            'private_key': {
                                'type': 'string',
                            },
                        },
                        'required': ['private_key', 'client_email', 'client_id'],
                        'type': 'object',
                    },
                    'GuestsDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&guests=bob@cal.com`,      the guests field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'only allowed value for type is `guests`',
                                'example': 'guests',
                                'type': 'string',
                            },
                        },
                        'required': ['slug'],
                        'type': 'object',
                    },
                    'GuestsDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&guests=lauris@cal.com`,      the guests field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'guests',
                                'description': 'only allowed value for type is `guests`',
                                'enum': ['name', 'email', 'title', 'notes', 'guests'],
                                'example': 'guests',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'multiemail',
                                'type': 'string',
                            },
                        },
                        'required': ['slug', 'isDefault', 'type'],
                        'type': 'object',
                    },
                    'Host': {
                        'properties': {
                            'mandatory': {
                                'description': 'Only relevant for round robin event types. If true then the user must attend round robin event always.',
                                'type': 'boolean',
                            },
                            'priority': {
                                'enum': ['lowest', 'low', 'medium', 'high', 'highest'],
                                'type': 'string',
                            },
                            'userId': {
                                'description': 'Which user is the host of this event',
                                'type': 'number',
                            },
                        },
                        'required': ['userId'],
                        'type': 'object',
                    },
                    'InputAddressLocation_2024_06_14': {
                        'properties': {
                            'address': {
                                'example': '123 Example St, City, Country',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `address`',
                                'example': 'address',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'address', 'public'],
                        'type': 'object',
                    },
                    'InputAttendeeAddressLocation_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `attendeeAddress`',
                                'example': 'attendeeAddress',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'InputAttendeeDefinedLocation_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `attendeeDefined`',
                                'example': 'attendeeDefined',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'InputAttendeePhoneLocation_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `attendeePhone`',
                                'example': 'attendeePhone',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'InputIntegrationLocation_2024_06_14': {
                        'properties': {
                            'integration': {
                                'enum': ['cal-video', 'google-meet', 'office365-video', 'zoom'],
                                'example': 'cal-video',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `integration`',
                                'example': 'integration',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'integration'],
                        'type': 'object',
                    },
                    'InputLinkLocation_2024_06_14': {
                        'properties': {
                            'link': {
                                'example': 'https://customvideo.com/join/123456',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `link`',
                                'example': 'link',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'link', 'public'],
                        'type': 'object',
                    },
                    'InputOrganizersDefaultApp_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `organizersDefaultApp`',
                                'example': 'organizersDefaultApp',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'InputPhoneLocation_2024_06_14': {
                        'properties': {
                            'phone': {
                                'example': '+37120993151',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `phone`',
                                'example': 'phone',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'phone', 'public'],
                        'type': 'object',
                    },
                    'Integration': {
                        'properties': {
                            '__template': {
                                'type': 'string',
                            },
                            'appData': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'categories': {
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'category': {
                                'type': 'string',
                            },
                            'description': {
                                'type': 'string',
                            },
                            'dirName': {
                                'type': 'string',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'installed': {
                                'type': 'boolean',
                            },
                            'locationOption': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'logo': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'publisher': {
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'title': {
                                'type': 'string',
                            },
                            'type': {
                                'type': 'string',
                            },
                            'url': {
                                'type': 'string',
                            },
                            'variant': {
                                'type': 'string',
                            },
                        },
                        'required': [
                            'name',
                            'description',
                            'type',
                            'variant',
                            'categories',
                            'logo',
                            'publisher',
                            'slug',
                            'url',
                            'email',
                            'locationOption',
                        ],
                        'type': 'object',
                    },
                    'KeysDto': {
                        'properties': {
                            'accessToken': {
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                'type': 'string',
                            },
                            'accessTokenExpiresAt': {
                                'type': 'number',
                            },
                            'refreshToken': {
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                                'type': 'string',
                            },
                            'refreshTokenExpiresAt': {
                                'type': 'number',
                            },
                        },
                        'required': ['accessToken', 'refreshToken', 'accessTokenExpiresAt', 'refreshTokenExpiresAt'],
                        'type': 'object',
                    },
                    'KeysResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/KeysDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'LocationDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'location',
                                'description': 'This booking field is returned only if the event type has more than one location. The purpose of this field is to allow the user to select the location where the event will take place.',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'radioInput',
                                'type': 'string',
                            },
                        },
                        'required': ['isDefault', 'slug', 'type', 'required', 'hidden'],
                        'type': 'object',
                    },
                    'ManagedOrganizationOutput': {
                        'properties': {
                            'id': {
                                'type': 'number',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name'],
                        'type': 'object',
                    },
                    'ManagedOrganizationWithApiKeyOutput': {
                        'properties': {
                            'apiKey': {
                                'type': 'string',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'apiKey'],
                        'type': 'object',
                    },
                    'ManagedUserOutput': {
                        'properties': {
                            'avatarUrl': {
                                'description': 'URL of the user\'s avatar image',
                                'example': 'https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png',
                                'nullable': true,
                                'type': 'string',
                            },
                            'bio': {
                                'example': 'bio',
                                'nullable': true,
                                'type': 'string',
                            },
                            'createdDate': {
                                'example': '2024-04-01T00:00:00.000Z',
                                'type': 'string',
                            },
                            'defaultScheduleId': {
                                'example': null,
                                'nullable': true,
                                'type': 'number',
                            },
                            'email': {
                                'example': 'alice+cluo37fwd0001khkzqqynkpj3@example.com',
                                'type': 'string',
                            },
                            'id': {
                                'example': 1,
                                'type': 'number',
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
                                'example': 'en',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'example': 'alice',
                                'nullable': true,
                                'type': 'string',
                            },
                            'timeFormat': {
                                'example': 12,
                                'nullable': true,
                                'type': 'number',
                            },
                            'timeZone': {
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'username': {
                                'example': 'alice',
                                'nullable': true,
                                'type': 'string',
                            },
                            'weekStart': {
                                'example': 'Sunday',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'email',
                            'username',
                            'name',
                            'bio',
                            'timeZone',
                            'weekStart',
                            'createdDate',
                            'timeFormat',
                            'defaultScheduleId',
                        ],
                        'type': 'object',
                    },
                    'MarkAbsentBookingInput_2024_08_13': {
                        'properties': {
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/Attendee',
                                },
                                'type': 'array',
                            },
                            'host': {
                                'description': 'Whether the host was absent',
                                'example': false,
                                'type': 'boolean',
                            },
                        },
                        'type': 'object',
                    },
                    'MarkAbsentBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking data, which can be either a BookingOutput object or a RecurringBookingOutput object',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'MembershipUserOutputDto': {
                        'properties': {
                            'avatarUrl': {
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'username': {
                                'type': 'string',
                            },
                        },
                        'required': ['email'],
                        'type': 'object',
                    },
                    'MeOrgOutput': {
                        'properties': {
                            'id': {
                                'type': 'number',
                            },
                            'isPlatform': {
                                'type': 'boolean',
                            },
                        },
                        'required': ['isPlatform', 'id'],
                        'type': 'object',
                    },
                    'MeOutput': {
                        'properties': {
                            'defaultScheduleId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'organization': {
                                '$ref': '#/components/schemas/MeOrgOutput',
                            },
                            'organizationId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'type': 'string',
                            },
                            'username': {
                                'type': 'string',
                            },
                            'weekStart': {
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'username',
                            'email',
                            'timeFormat',
                            'defaultScheduleId',
                            'weekStart',
                            'timeZone',
                            'organizationId',
                        ],
                        'type': 'object',
                    },
                    'MultiEmailFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `consultants` and the URL contains query parameter `&consultants=alice@gmail.com&consultants=bob@gmail.com`,      the these emails will be added and none more can be added.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter multiple emails',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., example@example.com',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `multiemail`',
                                'example': 'multiemail',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'MultiEmailFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `consultants` and the URL contains query parameter `&consultants=alice@gmail.com&consultants=bob@gmail.com`,      the these emails will be added and none more can be added.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter multiple emails',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., example@example.com',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `multiemail`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'multiemail',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'MultiSelectAttribute': {
                        'properties': {
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'options': {
                                'items': {
                                    '$ref': '#/components/schemas/MultiSelectAttributeOption',
                                },
                                'type': 'array',
                            },
                            'type': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'type', 'options'],
                        'type': 'object',
                    },
                    'MultiSelectAttributeOption': {
                        'properties': {
                            'option': {
                                'type': 'string',
                            },
                            'optionId': {
                                'type': 'string',
                            },
                        },
                        'required': ['optionId', 'option'],
                        'type': 'object',
                    },
                    'MultiSelectFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `consultants` and the URL contains query parameter `&consultants=en&language=it`,      the \'en\' and \'it\' will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please select multiple options',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Option 1', 'Option 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `multiselect`',
                                'example': 'multiselect',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden'],
                        'type': 'object',
                    },
                    'MultiSelectFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `consultants` and the URL contains query parameter `&consultants=en&language=it`,      the \'en\' and \'it\' will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please select multiple options',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Option 1', 'Option 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `multiselect`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'multiselect',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'NameDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&name=bob`,      the name field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `name`. Used for having 1 booking field for both first name and last name.',
                                'example': 'name',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'label', 'placeholder'],
                        'type': 'object',
                    },
                    'NameDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&name=bob`,      the name field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'name',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'name',
                                'description': 'only allowed value for type is `name`. Used for having 1 booking field for both first name and last name.',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'name',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'isDefault', 'slug', 'required'],
                        'type': 'object',
                    },
                    'NotesDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&notes=journey`,      the notes field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'only allowed value for type is `notes`',
                                'example': 'notes',
                                'type': 'string',
                            },
                        },
                        'required': ['slug'],
                        'type': 'object',
                    },
                    'NotesDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&notes=hello`,      the notes field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'notes',
                                'description': 'only allowed value for type is `notes`',
                                'enum': ['name', 'email', 'title', 'notes', 'guests'],
                                'example': 'notes',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'textarea',
                                'type': 'string',
                            },
                        },
                        'required': ['slug', 'isDefault', 'type'],
                        'type': 'object',
                    },
                    'NoticeThreshold_2024_06_14': {
                        'properties': {
                            'count': {
                                'description': 'The time value for the notice threshold',
                                'example': 30,
                                'type': 'number',
                            },
                            'unit': {
                                'description': 'The unit of time for the notice threshold (e.g., minutes, hours)',
                                'example': 'minutes',
                                'type': 'string',
                            },
                        },
                        'required': ['unit', 'count'],
                        'type': 'object',
                    },
                    'NumberAttribute': {
                        'properties': {
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'option': {
                                'type': 'number',
                            },
                            'optionId': {
                                'type': 'string',
                            },
                            'type': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'type', 'option', 'optionId'],
                        'type': 'object',
                    },
                    'NumberFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `calories-per-day` and the URL contains query parameter `&calories-per-day=3000`,      the number field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter a number',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., 100',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `number`',
                                'example': 'number',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'NumberFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `calories-per-day` and the URL contains query parameter `&calories-per-day=3000`,      the number field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter a number',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., 100',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `number`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'number',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'OAuthClientWebhookOutputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'oAuthClientId': {
                                'type': 'string',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'triggers': {
                                'items': {
                                    'type': 'object',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['payloadTemplate', 'oAuthClientId', 'id', 'triggers', 'subscriberUrl', 'active'],
                        'type': 'object',
                    },
                    'OAuthClientWebhookOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OAuthClientWebhookOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OAuthClientWebhooksOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/OAuthClientWebhookOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OptionOutput': {
                        'properties': {
                            'attributeId': {
                                'description': 'The ID of the attribute',
                                'example': 'attr_id',
                                'type': 'string',
                            },
                            'id': {
                                'description': 'The ID of the option',
                                'example': 'attr_option_id',
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'The slug of the option',
                                'example': 'option-slug',
                                'type': 'string',
                            },
                            'value': {
                                'description': 'The value of the option',
                                'example': 'option_value',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'attributeId', 'value', 'slug'],
                        'type': 'object',
                    },
                    'OrganizationMembershipOutput': {
                        'properties': {
                            'accepted': {
                                'type': 'boolean',
                            },
                            'attributes': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/TextAttribute',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberAttribute',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SingleSelectAttribute',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectAttribute',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'disableImpersonation': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'role': {
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                            'teamId': {
                                'type': 'number',
                            },
                            'user': {
                                '$ref': '#/components/schemas/MembershipUserOutputDto',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'userId', 'teamId', 'accepted', 'role', 'user', 'attributes'],
                        'type': 'object',
                    },
                    'OrgMeTeamsOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/OrgTeamOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OrgTeamMembershipOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OrgTeamMembershipsOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/TeamMembershipOutput',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OrgTeamOutputDto': {
                        'properties': {
                            'appIconLogo': {
                                'type': 'string',
                            },
                            'appLogo': {
                                'type': 'string',
                            },
                            'bannerUrl': {
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'calVideoLogo': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'hideBookATeamMember': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'hideBranding': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'isOrganization': {
                                'type': 'boolean',
                            },
                            'isPrivate': {
                                'type': 'boolean',
                            },
                            'logoUrl': {
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'minLength': 1,
                                'type': 'string',
                            },
                            'parentId': {
                                'type': 'number',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'default': 'Europe/London',
                                'type': 'string',
                            },
                            'weekStart': {
                                'default': 'Sunday',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'isOrganization'],
                        'type': 'object',
                    },
                    'OrgTeamOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrgTeamOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OrgTeamsOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/OrgTeamOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'OutputAddressLocation_2024_06_14': {
                        'properties': {
                            'address': {
                                'example': '123 Example St, City, Country',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `address`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                ],
                                'example': 'address',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'address', 'public'],
                        'type': 'object',
                    },
                    'OutputIntegrationLocation_2024_06_14': {
                        'properties': {
                            'credentialId': {
                                'description': 'Credential ID associated with the integration',
                                'type': 'number',
                            },
                            'integration': {
                                'enum': [
                                    'cal-video',
                                    'google-meet',
                                    'zoom',
                                    'whereby-video',
                                    'whatsapp-video',
                                    'webex-video',
                                    'telegram-video',
                                    'tandem',
                                    'sylaps-video',
                                    'skype-video',
                                    'sirius-video',
                                    'signal-video',
                                    'shimmer-video',
                                    'salesroom-video',
                                    'roam-video',
                                    'riverside-video',
                                    'ping-video',
                                    'office365-video',
                                    'mirotalk-video',
                                    'jitsi',
                                    'jelly-video',
                                    'jelly-conferencing',
                                    'huddle',
                                    'facetime-video',
                                    'element-call-video',
                                    'eightxeight-video',
                                    'discord-video',
                                    'demodesk-video',
                                    'campfire-video',
                                ],
                                'example': 'cal-video',
                                'type': 'string',
                            },
                            'link': {
                                'example': 'https://example.com',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'Only allowed value for type is `integration`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                    'conferencing',
                                    'unknown',
                                ],
                                'example': 'integration',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'integration'],
                        'type': 'object',
                    },
                    'OutputLinkLocation_2024_06_14': {
                        'properties': {
                            'link': {
                                'example': 'https://customvideo.com/join/123456',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `link`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                ],
                                'example': 'link',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'link', 'public'],
                        'type': 'object',
                    },
                    'OutputOrganizersDefaultAppLocation_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'only allowed value for type is `organizersDefaultApp`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                    'conferencing',
                                    'unknown',
                                ],
                                'example': 'organizersDefaultApp',
                                'type': 'string',
                            },
                        },
                        'required': ['type'],
                        'type': 'object',
                    },
                    'OutputPhoneLocation_2024_06_14': {
                        'properties': {
                            'phone': {
                                'example': '+37120993151',
                                'type': 'string',
                            },
                            'public': {
                                'type': 'boolean',
                            },
                            'type': {
                                'description': 'only allowed value for type is `phone`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                ],
                                'example': 'phone',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'phone', 'public'],
                        'type': 'object',
                    },
                    'OutputUnknownLocation_2024_06_14': {
                        'properties': {
                            'location': {
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `unknown`',
                                'enum': [
                                    'address',
                                    'link',
                                    'integration',
                                    'phone',
                                    'attendeeAddress',
                                    'attendeePhone',
                                    'attendeeDefined',
                                    'organizersDefaultApp',
                                    'conferencing',
                                    'unknown',
                                ],
                                'example': 'unknown',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'location'],
                        'type': 'object',
                    },
                    'PaginationMetaDto': {
                        'properties': {
                            'currentPage': {
                                'description': 'The current page number being returned.',
                                'example': 2,
                                'minimum': 1,
                                'type': 'number',
                            },
                            'hasNextPage': {
                                'description': 'Indicates if there is a subsequent page available after the current one.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'hasPreviousPage': {
                                'description': 'Indicates if there is a preceding page available before the current one.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'itemsPerPage': {
                                'description': 'The maximum number of items requested per page.',
                                'example': 10,
                                'minimum': 1,
                                'type': 'number',
                            },
                            'remainingItems': {
                                'description': 'The number of items remaining to be fetched *after* the current page. Calculated as: `totalItems - (skip + itemsPerPage)`.',
                                'example': 103,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'totalItems': {
                                'description': 'The total number of items available across all pages, matching the query criteria.',
                                'example': 123,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'totalPages': {
                                'description': 'The total number of pages available.',
                                'example': 13,
                                'minimum': 0,
                                'type': 'number',
                            },
                        },
                        'required': [
                            'totalItems',
                            'remainingItems',
                            'itemsPerPage',
                            'currentPage',
                            'totalPages',
                            'hasNextPage',
                            'hasPreviousPage',
                        ],
                        'type': 'object',
                    },
                    'PhoneFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `phone` and the URL contains query parameter `&phone=1234567890`,      the phone field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking. Special slug is `attendeePhoneNumber` - if you create\n      a phone input field with this slug for organization team event type you can create an organization team event type that can be booked using phone without requiring an email by setting {"type": "email", "required": false, "hidden": true} to the email booking field input in the request body.',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `phone`',
                                'example': 'phone',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'PhoneFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `phone` and the URL contains query parameter `&phone=1234567890`,      the phone field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking. Special slug is `attendeePhoneNumber` - if you create\n      a phone input field with this slug for organization team event type you can create an organization team event type that can be booked using phone without requiring an email by setting {"type": "email", "required": false, "hidden": true} to the email booking field input in the request body.',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `phone`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'phone',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'PlatformOAuthClientDto': {
                        'properties': {
                            'areDefaultEventTypesEnabled': {
                                'description': 'If enabled, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Leave this disabled if you want to create a managed user and then manually create event types for the user.',
                                'example': true,
                                'type': 'boolean',
                            },
                            'areEmailsEnabled': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'bookingCancelRedirectUri': {
                                'example': 'https://example.com/booking-cancel',
                                'type': 'string',
                            },
                            'bookingRedirectUri': {
                                'example': 'https://example.com/booking-redirect',
                                'type': 'string',
                            },
                            'bookingRescheduleRedirectUri': {
                                'example': 'https://example.com/booking-reschedule',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-03-23T08:33:21.851Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'id': {
                                'example': 'clsx38nbl0001vkhlwin9fmt0',
                                'type': 'string',
                            },
                            'logo': {
                                'example': 'https://example.com/logo.png',
                                'type': 'object',
                            },
                            'name': {
                                'example': 'MyClient',
                                'type': 'string',
                            },
                            'organizationId': {
                                'example': 1,
                                'type': 'number',
                            },
                            'permissions': {
                                'description': 'Array of permission keys like ["BOOKING_READ", "BOOKING_WRITE"]',
                                'example': ['BOOKING_READ', 'BOOKING_WRITE'],
                                'items': {
                                    'enum': [
                                        'EVENT_TYPE_READ',
                                        'EVENT_TYPE_WRITE',
                                        'BOOKING_READ',
                                        'BOOKING_WRITE',
                                        'SCHEDULE_READ',
                                        'SCHEDULE_WRITE',
                                        'APPS_READ',
                                        'APPS_WRITE',
                                        'PROFILE_READ',
                                        'PROFILE_WRITE',
                                    ],
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'redirectUris': {
                                'example': ['https://example.com/callback'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'secret': {
                                'example': 'secretValue',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'name',
                            'secret',
                            'permissions',
                            'redirectUris',
                            'organizationId',
                            'createdAt',
                            'areEmailsEnabled',
                            'areDefaultEventTypesEnabled',
                        ],
                        'type': 'object',
                    },
                    'Primary': {
                        'properties': {
                            'credentialId': {
                                'type': 'number',
                            },
                            'delegationCredentialId': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'email': {
                                'type': 'string',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'integration': {
                                'type': 'string',
                            },
                            'isSelected': {
                                'type': 'boolean',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'primary': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'readOnly': {
                                'type': 'boolean',
                            },
                        },
                        'required': ['externalId', 'primary', 'readOnly', 'isSelected', 'credentialId'],
                        'type': 'object',
                    },
                    'ProfileOutput': {
                        'properties': {
                            'id': {
                                'description': 'The ID of the profile of user',
                                'example': 1,
                                'type': 'number',
                            },
                            'organizationId': {
                                'description': 'The ID of the organization of user',
                                'example': 1,
                                'type': 'number',
                            },
                            'userId': {
                                'description': 'The IDof the user',
                                'example': 1,
                                'type': 'number',
                            },
                            'username': {
                                'description': 'The username of the user within the organization context',
                                'example': 'john_doe',
                                'nullable': true,
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'organizationId', 'userId'],
                        'type': 'object',
                    },
                    'RadioGroupFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `language` and options of this select field are [\'english\', \'italian\'] and the URL contains query parameter `&language=italian`,      the \'italian\' radio button will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Select one option',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Radio 1', 'Radio 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `radio`',
                                'example': 'radio',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden'],
                        'type': 'object',
                    },
                    'RadioGroupFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `language` and options of this select field are [\'english\', \'italian\'] and the URL contains query parameter `&language=italian`,      the \'italian\' radio button will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Select one option',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Radio 1', 'Radio 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `radio`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'radio',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'RangeSlotsOutput_2024_09_04': {
                        'properties': {},
                        'type': 'object',
                    },
                    'RangeWindow_2024_06_14': {
                        'properties': {
                            'type': {
                                'description': 'Whether the window should be business days, calendar days or a range of dates',
                                'enum': ['businessDays', 'calendarDays', 'range'],
                                'type': 'string',
                            },
                            'value': {
                                'description': 'Date range for when this event can be booked.',
                                'example': ['2030-09-05', '2030-09-09'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['type', 'value'],
                        'type': 'object',
                    },
                    'ReassignBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/ReassignBookingOutput_2024_08_13',
                                    },
                                ],
                                'description': 'Booking data, which can be either a ReassignAutoBookingOutput object or a ReassignManualBookingOutput object',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/ReassignBookingOutput_2024_08_13',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ReassignedToDto': {
                        'properties': {
                            'email': {
                                'example': 'john.doe@example.com',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'name': {
                                'example': 'John Doe',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'email'],
                        'type': 'object',
                    },
                    'ReassignToUserBookingInput_2024_08_13': {
                        'properties': {
                            'reason': {
                                'description': 'Reason for reassigning the booking',
                                'example': 'Host has to take another call',
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'Recurrence_2024_06_14': {
                        'properties': {
                            'frequency': {
                                'enum': ['yearly', 'monthly', 'weekly'],
                                'type': 'string',
                            },
                            'interval': {
                                'description': 'Repeats every {count} week | month | year',
                                'example': 10,
                                'type': 'number',
                            },
                            'occurrences': {
                                'description': 'Repeats for a maximum of {count} events',
                                'example': 10,
                                'type': 'number',
                            },
                        },
                        'required': ['interval', 'occurrences', 'frequency'],
                        'type': 'object',
                    },
                    'RecurringBookingOutput_2024_08_13': {
                        'properties': {
                            'absentHost': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'attendees': {
                                'items': {
                                    '$ref': '#/components/schemas/Attendee',
                                },
                                'type': 'array',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'cancellationReason': {
                                'example': 'User requested cancellation',
                                'type': 'string',
                            },
                            'cancelledByEmail': {
                                'example': 'canceller@example.com',
                                'type': 'string',
                            },
                            'createdAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Learn how to integrate scheduling into marketplace.',
                                'type': 'string',
                            },
                            'duration': {
                                'example': 60,
                                'type': 'number',
                            },
                            'end': {
                                'example': '2024-08-13T16:30:00Z',
                                'type': 'string',
                            },
                            'eventType': {
                                '$ref': '#/components/schemas/EventType',
                            },
                            'eventTypeId': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'eventType\' object containing the id instead.',
                                'example': 50,
                                'type': 'number',
                            },
                            'guests': {
                                'example': ['guest1@example.com', 'guest2@example.com'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/BookingHost',
                                },
                                'type': 'array',
                            },
                            'icsUid': {
                                'description': 'UID of ICS event.',
                                'example': 'ics_uid_123',
                                'type': 'string',
                            },
                            'id': {
                                'example': 123,
                                'type': 'number',
                            },
                            'location': {
                                'example': 'https://example.com/meeting',
                                'type': 'string',
                            },
                            'meetingUrl': {
                                'deprecated': true,
                                'description': 'Deprecated - rely on \'location\' field instead.',
                                'example': 'https://example.com/recurring-meeting',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'rating': {
                                'example': 4,
                                'type': 'number',
                            },
                            'recurringBookingUid': {
                                'example': 'recurring_uid_987',
                                'type': 'string',
                            },
                            'rescheduledByEmail': {
                                'example': 'rescheduler@example.com',
                                'type': 'string',
                            },
                            'rescheduledFromUid': {
                                'example': 'previous_uid_123',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'example': 'User rescheduled the event',
                                'type': 'string',
                            },
                            'start': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                            'status': {
                                'enum': ['cancelled', 'accepted', 'rejected', 'pending'],
                                'example': 'accepted',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Consultation',
                                'type': 'string',
                            },
                            'uid': {
                                'example': 'booking_uid_123',
                                'type': 'string',
                            },
                            'updatedAt': {
                                'example': '2024-08-13T15:30:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'id',
                            'uid',
                            'title',
                            'description',
                            'hosts',
                            'status',
                            'start',
                            'end',
                            'duration',
                            'eventTypeId',
                            'eventType',
                            'location',
                            'absentHost',
                            'createdAt',
                            'updatedAt',
                            'attendees',
                            'bookingFieldsResponses',
                            'recurringBookingUid',
                        ],
                        'type': 'object',
                    },
                    'RefreshApiKeyInput': {
                        'properties': {
                            'apiKeyDaysValid': {
                                'default': 30,
                                'description': 'For how many days is managed organization api key valid. Defaults to 30 days.',
                                'example': 60,
                                'minimum': 1,
                                'type': 'number',
                            },
                            'apiKeyNeverExpires': {
                                'description': 'If true, organization api key never expires.',
                                'example': true,
                                'type': 'boolean',
                            },
                        },
                        'type': 'object',
                    },
                    'RefreshApiKeyOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ApiKeyOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'RefreshTokenInput': {
                        'properties': {
                            'refreshToken': {
                                'description': 'Managed user\'s refresh token.',
                                'type': 'string',
                            },
                        },
                        'required': ['refreshToken'],
                        'type': 'object',
                    },
                    'RequestEmailVerificationInput': {
                        'properties': {
                            'email': {
                                'description': 'Email to verify.',
                                'example': 'acme@example.com',
                                'type': 'string',
                            },
                        },
                        'required': ['email'],
                        'type': 'object',
                    },
                    'RequestEmailVerificationOutput': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'RequestPhoneVerificationInput': {
                        'properties': {
                            'phone': {
                                'description': 'Phone number to verify.',
                                'example': '+372 5555 6666',
                                'type': 'string',
                            },
                        },
                        'required': ['phone'],
                        'type': 'object',
                    },
                    'RequestPhoneVerificationOutput': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'RescheduleBookingInput_2024_08_13': {
                        'properties': {
                            'rescheduledBy': {
                                'description': 'Email of the person who is rescheduling the booking - only needed when rescheduling a booking that requires a confirmation.\nIf event type owner email is provided then rescheduled booking will be automatically confirmed. If attendee email or no email is passed then the event type\nowner will have to confirm the rescheduled booking.',
                                'type': 'string',
                            },
                            'reschedulingReason': {
                                'description': 'Reason for rescheduling the booking',
                                'example': 'User requested reschedule',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'Start time in ISO 8601 format for the new booking',
                                'example': '2024-08-13T10:00:00Z',
                                'type': 'string',
                            },
                        },
                        'required': ['start'],
                        'type': 'object',
                    },
                    'RescheduleBookingOutput_2024_08_13': {
                        'properties': {
                            'data': {
                                'description': 'Booking data, which can be either a BookingOutput object or a RecurringBookingOutput object',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RecurringBookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CreateSeatedBookingOutput_2024_08_13',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CreateRecurringSeatedBookingOutput_2024_08_13',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'RescheduleReasonDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&rescheduleReason=travel`,      the rescheduleReason field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'only allowed value for type is `rescheduleReason`',
                                'example': 'rescheduleReason',
                                'type': 'string',
                            },
                        },
                        'required': ['slug'],
                        'type': 'object',
                    },
                    'RescheduleReasonDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&rescheduleReason=busy`,      the reschedule reason field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'rescheduleReason',
                                'description': 'only allowed value for type is `rescheduleReason`',
                                'enum': ['name', 'email', 'title', 'notes', 'guests'],
                                'example': 'rescheduleReason',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'textarea',
                                'type': 'string',
                            },
                        },
                        'required': ['slug', 'isDefault', 'type'],
                        'type': 'object',
                    },
                    'RescheduleSeatedBookingInput_2024_08_13': {
                        'properties': {
                            'rescheduledBy': {
                                'description': 'Email of the person who is rescheduling the booking - only needed when rescheduling a booking that requires a confirmation.\nIf event type owner email is provided then rescheduled booking will be automatically confirmed. If attendee email or no email is passed then the event type\nowner will have to confirm the rescheduled booking.',
                                'type': 'string',
                            },
                            'seatUid': {
                                'description': 'Uid of the specific seat within booking.',
                                'example': '3be561a9-31f1-4b8e-aefc-9d9a085f0dd1',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'Start time in ISO 8601 format for the new booking',
                                'example': '2024-08-13T10:00:00Z',
                                'type': 'string',
                            },
                        },
                        'required': ['start', 'seatUid'],
                        'type': 'object',
                    },
                    'ReserveSlotInput_2024_09_04': {
                        'properties': {
                            'eventTypeId': {
                                'description': 'The ID of the event type for which slot should be reserved.',
                                'example': 1,
                                'type': 'number',
                            },
                            'reservationDuration': {
                                'description': 'ONLY for authenticated requests with api key, access token or OAuth credentials (ID + secret).\n      \n      For how many minutes the slot should be reserved - for this long time noone else can book this event type at `start` time. If not provided, defaults to 5 minutes.',
                                'example': 5,
                                'type': 'number',
                            },
                            'slotDuration': {
                                'description': 'By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here as a number in minutes. If you don\'t have this set explicitly that event type can have one of many lengths you can omit this.',
                                'example': '30',
                                'type': 'number',
                            },
                            'slotStart': {
                                'description': 'ISO 8601 datestring in UTC timezone representing available slot.',
                                'example': '2024-09-04T09:00:00Z',
                                'type': 'string',
                            },
                        },
                        'required': ['eventTypeId', 'slotStart'],
                        'type': 'object',
                    },
                    'ReserveSlotOutput_2024_09_04': {
                        'properties': {
                            'eventTypeId': {
                                'description': 'The ID of the event type for which slot was reserved.',
                                'example': 1,
                                'type': 'number',
                            },
                            'reservationDuration': {
                                'description': 'For how many minutes the slot is reserved - for this long time noone else can book this event type at `start` time.',
                                'example': 5,
                                'type': 'number',
                            },
                            'reservationUid': {
                                'description': 'The unique identifier of the reservation. Use it to update, get or delete the reservation.',
                                'example': 'e84be5a3-4696-49e3-acc7-b2f3999c3b94',
                                'type': 'string',
                            },
                            'reservationUntil': {
                                'description': 'ISO 8601 datestring in UTC timezone representing time until which the slot is reserved.',
                                'example': '2023-09-04T10:00:00Z',
                                'type': 'string',
                            },
                            'slotDuration': {
                                'description': 'By default slot duration is equal to event type length, but if you want to reserve a slot for an event type that has a variable length you can specify it here. If you don\'t have this set explicitly that event type can have one of many lengths you can omit this.',
                                'example': '30',
                                'type': 'number',
                            },
                            'slotEnd': {
                                'description': 'ISO 8601 datestring in UTC timezone representing slot end.',
                                'example': '2024-09-04T10:00:00Z',
                                'type': 'string',
                            },
                            'slotStart': {
                                'description': 'ISO 8601 datestring in UTC timezone representing available slot.',
                                'example': '2024-09-04T09:00:00Z',
                                'type': 'string',
                            },
                        },
                        'required': [
                            'eventTypeId',
                            'slotStart',
                            'slotEnd',
                            'slotDuration',
                            'reservationUid',
                            'reservationDuration',
                            'reservationUntil',
                        ],
                        'type': 'object',
                    },
                    'ReserveSlotOutputResponse_2024_09_04': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ReserveSlotOutput_2024_09_04',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ResponseSlotsOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ResponseSlotsOutputData',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ResponseSlotsOutputData': {
                        'properties': {
                            'eventTypeId': {
                                'type': 'number',
                            },
                            'slots': {
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/SlotsOutput_2024_09_04',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RangeSlotsOutput_2024_09_04',
                                    },
                                ],
                            },
                        },
                        'required': ['eventTypeId', 'slots'],
                        'type': 'object',
                    },
                    'RoutingFormOutput': {
                        'properties': {
                            'createdAt': {
                                'example': '2024-03-28T10:00:00.000Z',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'This is the description.',
                                'nullable': true,
                                'type': 'string',
                            },
                            'disabled': {
                                'example': false,
                                'type': 'boolean',
                            },
                            'fields': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'example': 'My Form',
                                'type': 'string',
                            },
                            'position': {
                                'example': 0,
                                'type': 'number',
                            },
                            'routes': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'settings': {
                                'nullable': true,
                                'type': 'object',
                            },
                            'teamId': {
                                'example': 4214321,
                                'nullable': true,
                                'type': 'number',
                            },
                            'updatedAt': {
                                'example': '2024-03-28T10:00:00.000Z',
                                'type': 'string',
                            },
                            'userId': {
                                'example': 2313,
                                'type': 'number',
                            },
                        },
                        'required': [
                            'name',
                            'description',
                            'position',
                            'createdAt',
                            'updatedAt',
                            'userId',
                            'teamId',
                            'disabled',
                            'id',
                            'routes',
                            'fields',
                            'settings',
                        ],
                        'type': 'object',
                    },
                    'RoutingFormResponseOutput': {
                        'properties': {
                            'createdAt': {
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'formFillerId': {
                                'type': 'string',
                            },
                            'formId': {
                                'type': 'string',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'response': {
                                'example': {
                                    'f00b26df-f54b-4985-8d98-17c5482c6a24': {
                                        'label': 'participant',
                                        'value': 'mamut',
                                    },
                                },
                                'type': 'object',
                            },
                            'routedToBookingUid': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'formId', 'formFillerId', 'routedToBookingUid', 'response', 'createdAt'],
                        'type': 'object',
                    },
                    'ScheduleAvailabilityInput_2024_06_11': {
                        'properties': {
                            'days': {
                                'description': 'Array of days when schedule is active.',
                                'enum': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                'example': ['Monday', 'Tuesday'],
                                'items': {
                                    'enum': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'endTime': {
                                'description': 'endTime must be a valid time in format HH:MM e.g. 15:00',
                                'example': '15:00',
                                'pattern': 'TIME_FORMAT_HH_MM',
                                'type': 'string',
                            },
                            'startTime': {
                                'description': 'startTime must be a valid time in format HH:MM e.g. 08:00',
                                'example': '08:00',
                                'pattern': 'TIME_FORMAT_HH_MM',
                                'type': 'string',
                            },
                        },
                        'required': ['days', 'startTime', 'endTime'],
                        'type': 'object',
                    },
                    'ScheduleOutput': {
                        'properties': {
                            'availability': {
                                'items': {
                                    'type': 'array',
                                },
                                'type': 'array',
                            },
                            'dateOverrides': {
                                'items': {
                                    'type': 'object',
                                },
                                'type': 'array',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'isDefault': {
                                'type': 'boolean',
                            },
                            'isLastSchedule': {
                                'type': 'boolean',
                            },
                            'isManaged': {
                                'type': 'boolean',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'readOnly': {
                                'type': 'boolean',
                            },
                            'schedule': {
                                'items': {
                                    '$ref': '#/components/schemas/AvailabilityModel',
                                },
                                'type': 'array',
                            },
                            'timeZone': {
                                'type': 'string',
                            },
                            'workingHours': {
                                'items': {
                                    '$ref': '#/components/schemas/WorkingHours',
                                },
                                'type': 'array',
                            },
                        },
                        'required': [
                            'id',
                            'name',
                            'isManaged',
                            'workingHours',
                            'schedule',
                            'availability',
                            'timeZone',
                            'isDefault',
                            'isLastSchedule',
                            'readOnly',
                        ],
                        'type': 'object',
                    },
                    'ScheduleOutput_2024_06_11': {
                        'properties': {
                            'availability': {
                                'example': [
                                    {
                                        'days': ['Monday', 'Tuesday'],
                                        'endTime': '19:00',
                                        'startTime': '17:00',
                                    },
                                    {
                                        'days': ['Wednesday', 'Thursday'],
                                        'endTime': '20:00',
                                        'startTime': '16:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleAvailabilityInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'id': {
                                'example': 254,
                                'type': 'number',
                            },
                            'isDefault': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'name': {
                                'example': 'Catch up hours',
                                'type': 'string',
                            },
                            'overrides': {
                                'example': [
                                    {
                                        'date': '2024-05-20',
                                        'endTime': '21:00',
                                        'startTime': '18:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleOverrideInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'ownerId': {
                                'example': 478,
                                'type': 'number',
                            },
                            'timeZone': {
                                'example': 'Europe/Rome',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'ownerId', 'name', 'timeZone', 'availability', 'isDefault', 'overrides'],
                        'type': 'object',
                    },
                    'ScheduleOverrideInput_2024_06_11': {
                        'properties': {
                            'date': {
                                'example': '2024-05-20',
                                'type': 'string',
                            },
                            'endTime': {
                                'description': 'endTime must be a valid time in format HH:MM e.g. 13:00',
                                'example': '13:00',
                                'pattern': 'TIME_FORMAT_HH_MM',
                                'type': 'string',
                            },
                            'startTime': {
                                'description': 'startTime must be a valid time in format HH:MM e.g. 12:00',
                                'example': '12:00',
                                'pattern': 'TIME_FORMAT_HH_MM',
                                'type': 'string',
                            },
                        },
                        'required': ['date', 'startTime', 'endTime'],
                        'type': 'object',
                    },
                    'SeatedAttendee': {
                        'properties': {
                            'absent': {
                                'example': false,
                                'type': 'boolean',
                            },
                            'bookingFieldsResponses': {
                                'description': 'Booking field responses consisting of an object with booking field slug as keys and user response as values.',
                                'example': {
                                    'customField': 'customValue',
                                },
                                'type': 'object',
                            },
                            'email': {
                                'example': 'john@example.com',
                                'type': 'string',
                            },
                            'language': {
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
                                'example': 'en',
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'example': 'John Doe',
                                'type': 'string',
                            },
                            'phoneNumber': {
                                'example': '+1234567890',
                                'type': 'string',
                            },
                            'seatUid': {
                                'example': '3be561a9-31f1-4b8e-aefc-9d9a085f0dd1',
                                'type': 'string',
                            },
                            'timeZone': {
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                        },
                        'required': ['name', 'email', 'timeZone', 'absent', 'seatUid', 'bookingFieldsResponses'],
                        'type': 'object',
                    },
                    'Seats_2024_06_14': {
                        'properties': {
                            'seatsPerTimeSlot': {
                                'description': 'Number of seats available per time slot',
                                'example': 4,
                                'type': 'number',
                            },
                            'showAttendeeInfo': {
                                'description': 'Show attendee information to other guests',
                                'example': true,
                                'type': 'boolean',
                            },
                            'showAvailabilityCount': {
                                'description': 'Display the count of available seats',
                                'example': true,
                                'type': 'boolean',
                            },
                        },
                        'required': ['seatsPerTimeSlot', 'showAttendeeInfo', 'showAvailabilityCount'],
                        'type': 'object',
                    },
                    'SelectedCalendarOutputDto': {
                        'properties': {
                            'credentialId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'integration': {
                                'type': 'string',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['userId', 'integration', 'externalId', 'credentialId'],
                        'type': 'object',
                    },
                    'SelectedCalendarOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/SelectedCalendarOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'SelectedCalendarsInputDto': {
                        'properties': {
                            'credentialId': {
                                'type': 'number',
                            },
                            'delegationCredentialId': {
                                'type': 'string',
                            },
                            'externalId': {
                                'type': 'string',
                            },
                            'integration': {
                                'type': 'string',
                            },
                        },
                        'required': ['integration', 'externalId', 'credentialId'],
                        'type': 'object',
                    },
                    'SelectFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `language` and options of this select field are [\'english\', \'italian\'] and the URL contains query parameter `&language=italian`,      the \'italian\' will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please select an option',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Option 1', 'Option 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'placeholder': {
                                'example': 'Select...',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `select`',
                                'example': 'select',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'options', 'hidden'],
                        'type': 'object',
                    },
                    'SelectFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `language` and options of this select field are [\'english\', \'italian\'] and the URL contains query parameter `&language=italian`,      the \'italian\' will be selected and the select field will be disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please select an option',
                                'type': 'string',
                            },
                            'options': {
                                'example': ['Option 1', 'Option 2'],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'placeholder': {
                                'example': 'Select...',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `select`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'select',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'options', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'SetDefaultConferencingAppOutputResponseDto': {
                        'properties': {
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'SingleSelectAttribute': {
                        'properties': {
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'option': {
                                'type': 'string',
                            },
                            'optionId': {
                                'type': 'string',
                            },
                            'type': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'type', 'option', 'optionId'],
                        'type': 'object',
                    },
                    'SlotsOutput_2024_09_04': {
                        'properties': {},
                        'type': 'object',
                    },
                    'StripConnectOutputDto': {
                        'properties': {
                            'authUrl': {
                                'type': 'string',
                            },
                        },
                        'required': ['authUrl'],
                        'type': 'object',
                    },
                    'StripConnectOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/StripConnectOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'StripCredentialsCheckOutputResponseDto': {
                        'properties': {
                            'status': {
                                'example': 'success',
                                'type': 'object',
                            },
                        },
                        'required': ['status'],
                        'type': 'object',
                    },
                    'StripCredentialsSaveOutputResponseDto': {
                        'properties': {
                            'url': {
                                'type': 'string',
                            },
                        },
                        'required': ['url'],
                        'type': 'object',
                    },
                    'TeamEventTypeOutput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'example': 0,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'assignAllTeamMembers': {
                                'type': 'boolean',
                            },
                            'beforeEventBuffer': {
                                'example': 0,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                            },
                            'bookingFields': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/LocationDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldOutput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/UrlFieldOutput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'type': 'object',
                            },
                            'bookingLimitsDuration': {
                                'type': 'object',
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'type': 'object',
                            },
                            'currency': {
                                'type': 'string',
                            },
                            'customName': {
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'type': 'boolean',
                            },
                            'forwardParamsSuccessRedirect': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/TeamEventTypeResponseHost',
                                },
                                'type': 'array',
                            },
                            'id': {
                                'example': 1,
                                'type': 'number',
                            },
                            'isInstantEvent': {
                                'type': 'boolean',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'minimum': 1,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'minimum': 1,
                                    'type': 'number',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/OutputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputOrganizersDefaultAppLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/OutputUnknownLocation_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'metadata': {
                                'type': 'object',
                            },
                            'minimumBookingNotice': {
                                'example': 0,
                                'minimum': 0,
                                'type': 'number',
                            },
                            'offsetStart': {
                                'minimum': 1,
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'type': 'boolean',
                            },
                            'ownerId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'parentEventTypeId': {
                                'description': 'For managed event types, parent event type is the event type that this event type is based on',
                                'nullable': true,
                                'type': 'number',
                            },
                            'price': {
                                'type': 'number',
                            },
                            'recurrence': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                ],
                                'nullable': true,
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'schedulingType': {
                                'enum': ['roundRobin', 'collective', 'managed'],
                                'type': 'string',
                            },
                            'seats': {
                                '$ref': '#/components/schemas/Seats_2024_06_14',
                            },
                            'seatsPerTimeSlot': {
                                'nullable': true,
                                'type': 'number',
                            },
                            'seatsShowAvailabilityCount': {
                                'nullable': true,
                                'type': 'boolean',
                            },
                            'slotInterval': {
                                'example': 60,
                                'nullable': true,
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'nullable': true,
                                'type': 'string',
                            },
                            'team': {
                                '$ref': '#/components/schemas/EventTypeTeam',
                            },
                            'teamId': {
                                'type': 'number',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                        },
                        'required': [
                            'id',
                            'lengthInMinutes',
                            'title',
                            'slug',
                            'description',
                            'locations',
                            'bookingFields',
                            'disableGuests',
                            'recurrence',
                            'metadata',
                            'price',
                            'currency',
                            'lockTimeZoneToggleOnBookingPage',
                            'forwardParamsSuccessRedirect',
                            'successRedirectUrl',
                            'isInstantEvent',
                            'scheduleId',
                            'teamId',
                            'hosts',
                            'schedulingType',
                            'team',
                        ],
                        'type': 'object',
                    },
                    'TeamEventTypeResponseHost': {
                        'properties': {
                            'avatarUrl': {
                                'example': 'https://cal.com/api/avatar/d95949bc-ccb1-400f-acf6-045c51a16856.png',
                                'nullable': true,
                                'type': 'string',
                            },
                            'mandatory': {
                                'default': false,
                                'description': 'Only relevant for round robin event types. If true then the user must attend round robin event always.',
                                'type': 'boolean',
                            },
                            'name': {
                                'example': 'John Doe',
                                'type': 'string',
                            },
                            'priority': {
                                'default': 'medium',
                                'enum': ['lowest', 'low', 'medium', 'high', 'highest'],
                                'type': 'string',
                            },
                            'userId': {
                                'description': 'Which user is the host of this event',
                                'type': 'number',
                            },
                        },
                        'required': ['userId', 'name'],
                        'type': 'object',
                    },
                    'TeamMembershipOutput': {
                        'properties': {
                            'accepted': {
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'role': {
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                            'teamId': {
                                'type': 'number',
                            },
                            'user': {
                                '$ref': '#/components/schemas/MembershipUserOutputDto',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['id', 'userId', 'teamId', 'accepted', 'role', 'user'],
                        'type': 'object',
                    },
                    'TeamOutputDto': {
                        'properties': {
                            'appIconLogo': {
                                'type': 'string',
                            },
                            'appLogo': {
                                'type': 'string',
                            },
                            'bannerUrl': {
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'calVideoLogo': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'hideBookATeamMember': {
                                'default': false,
                                'type': 'boolean',
                            },
                            'hideBranding': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'isOrganization': {
                                'type': 'boolean',
                            },
                            'isPrivate': {
                                'type': 'boolean',
                            },
                            'logoUrl': {
                                'type': 'string',
                            },
                            'metadata': {
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'minLength': 1,
                                'type': 'string',
                            },
                            'parentId': {
                                'type': 'number',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'default': 'Europe/London',
                                'type': 'string',
                            },
                            'weekStart': {
                                'default': 'Sunday',
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'isOrganization'],
                        'type': 'object',
                    },
                    'TeamVerifiedEmailOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TeamVerifiedEmailsOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TeamVerifiedPhoneOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TeamVerifiedPhonesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TeamWebhookOutputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'teamId': {
                                'type': 'number',
                            },
                            'triggers': {
                                'items': {
                                    'type': 'object',
                                },
                                'type': 'array',
                            },
                        },
                        'required': ['payloadTemplate', 'teamId', 'id', 'triggers', 'subscriberUrl', 'active'],
                        'type': 'object',
                    },
                    'TeamWebhookOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamWebhookOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TeamWebhooksOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/TeamWebhookOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'TextAreaFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `dear-diary` and the URL contains query parameter `&dear-diary=Today I shipped a feature`,      the text area will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter detailed information',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Detailed description here...',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `textarea`',
                                'example': 'textarea',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'TextAreaFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `dear-diary` and the URL contains query parameter `&dear-diary=Today I shipped a feature`,      the text area will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter detailed information',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Detailed description here...',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `textarea`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'textarea',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'TextAttribute': {
                        'properties': {
                            'id': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'option': {
                                'type': 'string',
                            },
                            'optionId': {
                                'type': 'string',
                            },
                            'type': {
                                'type': 'string',
                            },
                        },
                        'required': ['id', 'name', 'type', 'option', 'optionId'],
                        'type': 'object',
                    },
                    'TextFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `who-referred-you` and the URL contains query parameter `&who-referred-you=bob`,      the text field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter your text',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Enter text here',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `text`',
                                'example': 'text',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'TextFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `who-referred-you` and the URL contains query parameter `&who-referred-you=bob`,      the text field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter your text',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Enter text here',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `text`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'text',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'TitleDefaultFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&title=journey`,      the title field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'only allowed value for type is `title`',
                                'example': 'title',
                                'type': 'string',
                            },
                        },
                        'required': ['slug'],
                        'type': 'object',
                    },
                    'TitleDefaultFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if URL contains query parameter `&title=masterclass`,      the title field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': true,
                                'description': 'This property is always true because it\'s a default field',
                                'example': true,
                                'type': 'object',
                            },
                            'label': {
                                'type': 'string',
                            },
                            'placeholder': {
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'default': 'title',
                                'description': 'only allowed value for type is `title`',
                                'enum': ['name', 'email', 'title', 'notes', 'guests'],
                                'example': 'title',
                                'type': 'string',
                            },
                            'type': {
                                'default': 'text',
                                'type': 'string',
                            },
                        },
                        'required': ['slug', 'isDefault', 'type'],
                        'type': 'object',
                    },
                    'UnassignOptionUserOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/AssignOptionUserOutputData',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateAttributeOptionOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OptionOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateDelegationCredentialInput': {
                        'properties': {
                            'enabled': {
                                'type': 'boolean',
                            },
                            'serviceAccountKey': {
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/GoogleServiceAccountKeyInput',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateDelegationCredentialOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/DelegationCredentialOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateEventTypeInput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'description': 'Time spaces that can be appended after an event to give more time after it.',
                                'type': 'number',
                            },
                            'beforeEventBuffer': {
                                'description': 'Time spaces that can be prepended before an event to give more time before it.',
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                                    },
                                ],
                                'description': 'Should booker have week, month or column view. Specify default layout and enabled layouts user can pick.',
                            },
                            'bookingFields': {
                                'description': 'Custom fields that can be added to the booking form when the event is booked by someone. By default booking form has name and email field.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldInput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'description': 'Limit how many times this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsCount_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingLimitsDuration': {
                                'description': 'Limit total amount of time that this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsDuration_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'description': 'Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseConfirmationPolicy_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'customName': {
                                'description': 'Customizable event name with valid variables:\n      {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name},\n      {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION},\n      {HOST/ATTENDEE}, {HOST}, {ATTENDEE}, {USER}',
                                'example': '{Event type title} between {Organiser} and {Scheduler}',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of the Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'description': 'If true, person booking this event can\'t add guests via their emails.',
                                'type': 'boolean',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'description': 'Locations where the event will take place. If not provided, cal video link will be used as the location.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/InputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeePhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeDefinedLocation_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'minimumBookingNotice': {
                                'description': 'Minimum number of minutes before the event that a booking can be made.',
                                'type': 'number',
                            },
                            'offsetStart': {
                                'description': 'Offset timeslots shown to bookers by a specified number of minutes',
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'description': 'This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.',
                                'type': 'boolean',
                            },
                            'recurrence': {
                                'description': 'Create a recurring event type.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'description': 'If you want that this event has different schedule than user\'s default one you can specify it here.',
                                'type': 'number',
                            },
                            'seats': {
                                'description': 'Create an event type with multiple seats.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Seats_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'slotInterval': {
                                'description': 'Number representing length of each slot when event is booked. By default it equal length of the event type.\n      If event length is 60 minutes then we would have slots 9AM, 10AM, 11AM etc. but if it was changed to 30 minutes then\n      we would have slots 9AM, 9:30AM, 10AM, 10:30AM etc. as the available times to book the 60 minute event.',
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'description': 'A valid URL where the booker will redirect to, once the booking is completed successfully',
                                'example': 'https://masterchief.com/argentina/flan/video/9129412',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateEventTypeOutput_2024_06_14': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/EventTypeOutput_2024_06_14',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateManagedUserInput': {
                        'properties': {
                            'avatarUrl': {
                                'description': 'URL of the user\'s avatar image',
                                'example': 'https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png',
                                'type': 'string',
                            },
                            'bio': {
                                'description': 'Bio',
                                'example': 'I am a bio',
                                'type': 'string',
                            },
                            'defaultScheduleId': {
                                'type': 'number',
                            },
                            'email': {
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
                                'example': 'en',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here. Metadata must have at most 50 keys, each key up to 40 characters, and values up to 500 characters.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'description': 'Must be 12 or 24',
                                'enum': [12, 24],
                                'example': 12,
                                'type': 'number',
                            },
                            'timeZone': {
                                'type': 'string',
                            },
                            'weekStart': {
                                'enum': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateMeOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/MeOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateOAuthClientInput': {
                        'properties': {
                            'areDefaultEventTypesEnabled': {
                                'description': 'If true, when creating a managed user the managed user will have 4 default event types: 30 and 60 minutes without Cal video, 30 and 60 minutes with Cal video. Set this as false if you want to create a managed user and then manually create event types for the user.',
                                'type': 'boolean',
                            },
                            'areEmailsEnabled': {
                                'type': 'boolean',
                            },
                            'bookingCancelRedirectUri': {
                                'type': 'string',
                            },
                            'bookingRedirectUri': {
                                'type': 'string',
                            },
                            'bookingRescheduleRedirectUri': {
                                'type': 'string',
                            },
                            'logo': {
                                'type': 'string',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'redirectUris': {
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrganizationAttributeInput': {
                        'properties': {
                            'enabled': {
                                'type': 'boolean',
                            },
                            'name': {
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                            'type': {
                                'enum': ['TEXT', 'NUMBER', 'SINGLE_SELECT', 'MULTI_SELECT'],
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrganizationAttributeOptionInput': {
                        'properties': {
                            'slug': {
                                'type': 'string',
                            },
                            'value': {
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrganizationAttributesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/Attribute',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateOrganizationInput': {
                        'properties': {
                            'metadata': {
                                'description': 'You can store any additional data you want here.\nMetadata must have at most 50 keys, each key up to 40 characters.\nValues can be strings (up to 500 characters), numbers, or booleans.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Name of the organization',
                                'example': 'CalTeam',
                                'minLength': 1,
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrganizationUserInput': {
                        'properties': {},
                        'type': 'object',
                    },
                    'UpdateOrgMembership': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/OrganizationMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateOrgMembershipDto': {
                        'properties': {
                            'accepted': {
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'type': 'boolean',
                            },
                            'role': {
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrgTeamDto': {
                        'properties': {
                            'appIconLogo': {
                                'type': 'string',
                            },
                            'appLogo': {
                                'type': 'string',
                            },
                            'bannerUrl': {
                                'description': 'URL of the teams banner image which is shown on booker',
                                'example': 'https://i.cal.com/api/avatar/949be534-7a88-4185-967c-c020b0c0bef3.png',
                                'type': 'string',
                            },
                            'bio': {
                                'type': 'string',
                            },
                            'bookingLimits': {
                                'type': 'string',
                            },
                            'brandColor': {
                                'type': 'string',
                            },
                            'calVideoLogo': {
                                'type': 'string',
                            },
                            'darkBrandColor': {
                                'type': 'string',
                            },
                            'hideBookATeamMember': {
                                'type': 'boolean',
                            },
                            'hideBranding': {
                                'type': 'boolean',
                            },
                            'includeManagedEventsInLimits': {
                                'type': 'boolean',
                            },
                            'isPrivate': {
                                'type': 'boolean',
                            },
                            'logoUrl': {
                                'description': 'URL of the teams logo image',
                                'example': 'https://i.cal.com/api/avatar/b0b58752-68ad-4c0d-8024-4fa382a77752.png',
                                'type': 'string',
                            },
                            'metadata': {
                                'description': 'You can store any additional data you want here.\nMetadata must have at most 50 keys, each key up to 40 characters.\nValues can be strings (up to 500 characters), numbers, or booleans.',
                                'example': {
                                    'key': 'value',
                                },
                                'type': 'object',
                            },
                            'name': {
                                'description': 'Name of the team',
                                'example': 'CalTeam',
                                'minLength': 1,
                                'type': 'string',
                            },
                            'slug': {
                                'description': 'Team slug',
                                'example': 'caltel',
                                'type': 'string',
                            },
                            'theme': {
                                'type': 'string',
                            },
                            'timeFormat': {
                                'type': 'number',
                            },
                            'timeZone': {
                                'description': 'Timezone is used to create teams\'s default schedule from Monday to Friday from 9AM to 5PM. It will default to Europe/London if not passed.',
                                'example': 'America/New_York',
                                'type': 'string',
                            },
                            'weekStart': {
                                'example': 'Monday',
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOrgTeamMembershipDto': {
                        'properties': {
                            'accepted': {
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'type': 'boolean',
                            },
                            'role': {
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateOutOfOfficeEntryDto': {
                        'properties': {
                            'end': {
                                'description': 'The end date and time of the out of office period in ISO 8601 format in UTC timezone.',
                                'example': '2023-05-10T23:59:59.999Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'notes': {
                                'description': 'Optional notes for the out of office entry.',
                                'example': 'Vacation in Hawaii',
                                'type': 'string',
                            },
                            'reason': {
                                'description': 'the reason for the out of office entry, if applicable',
                                'enum': ['unspecified', 'vacation', 'travel', 'sick', 'public_holiday'],
                                'example': 'vacation',
                                'type': 'string',
                            },
                            'start': {
                                'description': 'The start date and time of the out of office period in ISO 8601 format in UTC timezone.',
                                'example': '2023-05-01T00:00:00.000Z',
                                'format': 'date-time',
                                'type': 'string',
                            },
                            'toUserId': {
                                'description': 'The ID of the user covering for the out of office period, if applicable.',
                                'example': 2,
                                'type': 'number',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateRoutingFormResponseInput': {
                        'properties': {
                            'response': {
                                'description': 'The updated response data',
                                'type': 'object',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateRoutingFormResponseOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/RoutingFormResponseOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateScheduleInput_2024_06_11': {
                        'properties': {
                            'availability': {
                                'example': [
                                    {
                                        'days': ['Monday', 'Tuesday'],
                                        'endTime': '10:00',
                                        'startTime': '09:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleAvailabilityInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'isDefault': {
                                'example': true,
                                'type': 'boolean',
                            },
                            'name': {
                                'example': 'One-on-one coaching',
                                'type': 'string',
                            },
                            'overrides': {
                                'example': [
                                    {
                                        'date': '2024-05-20',
                                        'endTime': '14:00',
                                        'startTime': '12:00',
                                    },
                                ],
                                'items': {
                                    '$ref': '#/components/schemas/ScheduleOverrideInput_2024_06_11',
                                },
                                'type': 'array',
                            },
                            'timeZone': {
                                'example': 'Europe/Rome',
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateScheduleOutput_2024_06_11': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput_2024_06_11',
                            },
                            'error': {
                                'type': 'object',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateTeamEventTypeInput_2024_06_14': {
                        'properties': {
                            'afterEventBuffer': {
                                'description': 'Time spaces that can be appended after an event to give more time after it.',
                                'type': 'number',
                            },
                            'assignAllTeamMembers': {
                                'description': 'If true, all current and future team members will be assigned to this event type',
                                'type': 'boolean',
                            },
                            'beforeEventBuffer': {
                                'description': 'Time spaces that can be prepended before an event to give more time before it.',
                                'type': 'number',
                            },
                            'bookerLayouts': {
                                'allOf': [
                                    {
                                        '$ref': '#/components/schemas/BookerLayouts_2024_06_14',
                                    },
                                ],
                                'description': 'Should booker have week, month or column view. Specify default layout and enabled layouts user can pick.',
                            },
                            'bookingFields': {
                                'description': 'Custom fields that can be added to the booking form when the event is booked by someone. By default booking form has name and email field.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/NameDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/EmailDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TitleDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NotesDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/GuestsDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RescheduleReasonDefaultFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/PhoneFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/AddressFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/NumberFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/TextAreaFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/SelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiSelectFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/MultiEmailFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/CheckboxGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/RadioGroupFieldInput_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/BooleanFieldInput_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'bookingLimitsCount': {
                                'description': 'Limit how many times this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsCount_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingLimitsDuration': {
                                'description': 'Limit total amount of time that this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseBookingLimitsDuration_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'bookingWindow': {
                                'description': 'Limit how far in the future this event can be booked',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BusinessDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/CalendarDaysWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/RangeWindow_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'color': {
                                '$ref': '#/components/schemas/EventTypeColor_2024_06_14',
                            },
                            'confirmationPolicy': {
                                'description': 'Specify how the booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/BaseConfirmationPolicy_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'customName': {
                                'description': 'Customizable event name with valid variables:\n      {Event type title}, {Organiser}, {Scheduler}, {Location}, {Organiser first name},\n      {Scheduler first name}, {Scheduler last name}, {Event duration}, {LOCATION},\n      {HOST/ATTENDEE}, {HOST}, {ATTENDEE}, {USER}',
                                'example': '{Event type title} between {Organiser} and {Scheduler}',
                                'type': 'string',
                            },
                            'description': {
                                'example': 'Discover the culinary wonders of the Argentina by making the best flan ever!',
                                'type': 'string',
                            },
                            'destinationCalendar': {
                                '$ref': '#/components/schemas/DestinationCalendar_2024_06_14',
                            },
                            'disableGuests': {
                                'description': 'If true, person booking this event can\'t add guests via their emails.',
                                'type': 'boolean',
                            },
                            'hideCalendarEventDetails': {
                                'type': 'boolean',
                            },
                            'hideCalendarNotes': {
                                'type': 'boolean',
                            },
                            'hideOrganizerEmail': {
                                'description': 'Boolean to Hide organizer\'s email address from the booking screen, email notifications, and calendar events',
                                'type': 'boolean',
                            },
                            'hosts': {
                                'items': {
                                    '$ref': '#/components/schemas/Host',
                                },
                                'type': 'array',
                            },
                            'lengthInMinutes': {
                                'example': 60,
                                'type': 'number',
                            },
                            'lengthInMinutesOptions': {
                                'description': 'If you want that user can choose between different lengths of the event you can specify them here. Must include the provided `lengthInMinutes`.',
                                'example': [15, 30, 60],
                                'items': {
                                    'type': 'string',
                                },
                                'type': 'array',
                            },
                            'locations': {
                                'description': 'Locations where the event will take place. If not provided, cal video link will be used as the location.',
                                'items': {
                                    'oneOf': [
                                        {
                                            '$ref': '#/components/schemas/InputAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputLinkLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputIntegrationLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputPhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeAddressLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeePhoneLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputAttendeeDefinedLocation_2024_06_14',
                                        },
                                        {
                                            '$ref': '#/components/schemas/InputOrganizersDefaultApp_2024_06_14',
                                        },
                                    ],
                                },
                                'type': 'array',
                            },
                            'lockTimeZoneToggleOnBookingPage': {
                                'type': 'boolean',
                            },
                            'minimumBookingNotice': {
                                'description': 'Minimum number of minutes before the event that a booking can be made.',
                                'type': 'number',
                            },
                            'offsetStart': {
                                'description': 'Offset timeslots shown to bookers by a specified number of minutes',
                                'type': 'number',
                            },
                            'onlyShowFirstAvailableSlot': {
                                'description': 'This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.',
                                'type': 'boolean',
                            },
                            'recurrence': {
                                'description': 'Create a recurring event type.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Recurrence_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'requiresBookerEmailVerification': {
                                'type': 'boolean',
                            },
                            'scheduleId': {
                                'description': 'If you want that this event has different schedule than user\'s default one you can specify it here.',
                                'type': 'number',
                            },
                            'seats': {
                                'description': 'Create an event type with multiple seats.',
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/Seats_2024_06_14',
                                    },
                                    {
                                        '$ref': '#/components/schemas/Disabled_2024_06_14',
                                    },
                                ],
                            },
                            'slotInterval': {
                                'description': 'Number representing length of each slot when event is booked. By default it equal length of the event type.\n      If event length is 60 minutes then we would have slots 9AM, 10AM, 11AM etc. but if it was changed to 30 minutes then\n      we would have slots 9AM, 9:30AM, 10AM, 10:30AM etc. as the available times to book the 60 minute event.',
                                'type': 'number',
                            },
                            'slug': {
                                'example': 'learn-the-secrets-of-masterchief',
                                'type': 'string',
                            },
                            'successRedirectUrl': {
                                'description': 'A valid URL where the booker will redirect to, once the booking is completed successfully',
                                'example': 'https://masterchief.com/argentina/flan/video/9129412',
                                'type': 'string',
                            },
                            'title': {
                                'example': 'Learn the secrets of masterchief!',
                                'type': 'string',
                            },
                            'useDestinationCalendarEmail': {
                                'type': 'boolean',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateTeamEventTypeOutput': {
                        'properties': {
                            'data': {
                                'oneOf': [
                                    {
                                        '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                                    },
                                    {
                                        'items': {
                                            '$ref': '#/components/schemas/TeamEventTypeOutput_2024_06_14',
                                        },
                                        'type': 'array',
                                    },
                                ],
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateTeamMembershipInput': {
                        'properties': {
                            'accepted': {
                                'type': 'boolean',
                            },
                            'disableImpersonation': {
                                'type': 'boolean',
                            },
                            'role': {
                                'enum': ['MEMBER', 'OWNER', 'ADMIN'],
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UpdateTeamMembershipOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamMembershipOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateTeamOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/TeamOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UpdateWebhookInputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'triggers': {
                                'enum': [
                                    'BOOKING_CREATED',
                                    'BOOKING_PAYMENT_INITIATED',
                                    'BOOKING_PAID',
                                    'BOOKING_RESCHEDULED',
                                    'BOOKING_REQUESTED',
                                    'BOOKING_CANCELLED',
                                    'BOOKING_REJECTED',
                                    'BOOKING_NO_SHOW_UPDATED',
                                    'FORM_SUBMITTED',
                                    'MEETING_ENDED',
                                    'MEETING_STARTED',
                                    'RECORDING_READY',
                                    'INSTANT_MEETING',
                                    'RECORDING_TRANSCRIPTION_GENERATED',
                                    'OOO_CREATED',
                                    'AFTER_HOSTS_CAL_VIDEO_NO_SHOW',
                                    'AFTER_GUESTS_CAL_VIDEO_NO_SHOW',
                                    'FORM_SUBMITTED_NO_EVENT',
                                ],
                                'example': [
                                    'BOOKING_CREATED',
                                    'BOOKING_RESCHEDULED',
                                    'BOOKING_CANCELLED',
                                    'BOOKING_CONFIRMED',
                                    'BOOKING_REJECTED',
                                    'BOOKING_COMPLETED',
                                    'BOOKING_NO_SHOW',
                                    'BOOKING_REOPENED',
                                ],
                                'type': 'string',
                            },
                        },
                        'type': 'object',
                    },
                    'UrlFieldInput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `video-url` and the URL contains query parameter `&video-url=https://youtube.com/abc`the url field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'label': {
                                'example': 'Please enter your text',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Enter url here',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `url`',
                                'example': 'url',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'placeholder', 'hidden'],
                        'type': 'object',
                    },
                    'UrlFieldOutput_2024_06_14': {
                        'properties': {
                            'disableOnPrefill': {
                                'description': 'Disable this booking field if the URL contains query parameter with key equal to the slug and prefill it with the provided value.      For example, if the slug is `video-url` and the URL contains query parameter `&video-url=https://youtube.com/abc`the url field will be prefilled with this value and disabled.',
                                'type': 'boolean',
                            },
                            'hidden': {
                                'description': 'If true show under event type settings but don\'t show this booking field in the Booker. If false show in both.',
                                'type': 'boolean',
                            },
                            'isDefault': {
                                'default': false,
                                'description': 'This property is always false because it\'s not default field but custom field',
                                'example': false,
                                'type': 'object',
                            },
                            'label': {
                                'example': 'Please enter your text',
                                'type': 'string',
                            },
                            'placeholder': {
                                'example': 'e.g., Enter url here',
                                'type': 'string',
                            },
                            'required': {
                                'type': 'boolean',
                            },
                            'slug': {
                                'description': 'Unique identifier for the field in format `some-slug`. It is used to access response to this booking field during the booking',
                                'example': 'some-slug',
                                'type': 'string',
                            },
                            'type': {
                                'description': 'only allowed value for type is `url`',
                                'enum': [
                                    'name',
                                    'email',
                                    'phone',
                                    'address',
                                    'text',
                                    'number',
                                    'textarea',
                                    'select',
                                    'multiselect',
                                    'multiemail',
                                    'checkbox',
                                    'radio',
                                    'boolean',
                                    'url',
                                ],
                                'example': 'url',
                                'type': 'string',
                            },
                        },
                        'required': ['type', 'slug', 'label', 'required', 'hidden', 'isDefault'],
                        'type': 'object',
                    },
                    'UserVerifiedEmailOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UserVerifiedEmailsOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UserVerifiedPhoneOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UserVerifiedPhonesOutput': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/ScheduleOutput',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UserWebhookOutputDto': {
                        'properties': {
                            'active': {
                                'type': 'boolean',
                            },
                            'id': {
                                'type': 'number',
                            },
                            'payloadTemplate': {
                                'description': 'The template of the payload that will be sent to the subscriberUrl, check cal.com/docs/core-features/webhooks for more information',
                                'example': '{"content":"A new event has been scheduled","type":"{{type}}","name":"{{title}}","organizer":"{{organizer.name}}","booker":"{{attendees.0.name}}"}',
                                'type': 'string',
                            },
                            'secret': {
                                'type': 'string',
                            },
                            'subscriberUrl': {
                                'type': 'string',
                            },
                            'triggers': {
                                'items': {
                                    'type': 'object',
                                },
                                'type': 'array',
                            },
                            'userId': {
                                'type': 'number',
                            },
                        },
                        'required': ['payloadTemplate', 'userId', 'id', 'triggers', 'subscriberUrl', 'active'],
                        'type': 'object',
                    },
                    'UserWebhookOutputResponseDto': {
                        'properties': {
                            'data': {
                                '$ref': '#/components/schemas/UserWebhookOutputDto',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'UserWebhooksOutputResponseDto': {
                        'properties': {
                            'data': {
                                'items': {
                                    '$ref': '#/components/schemas/UserWebhookOutputDto',
                                },
                                'type': 'array',
                            },
                            'status': {
                                'enum': ['success', 'error'],
                                'example': 'success',
                                'type': 'string',
                            },
                        },
                        'required': ['status', 'data'],
                        'type': 'object',
                    },
                    'ValidateBookingLocation_2024_08_13': {
                        'properties': {},
                        'type': 'object',
                    },
                    'VerifyEmailInput': {
                        'properties': {
                            'code': {
                                'description': 'verification code sent to the email to verify',
                                'example': '1ABG2C',
                                'type': 'string',
                            },
                            'email': {
                                'description': 'Email to verify.',
                                'example': 'example@acme.com',
                                'type': 'string',
                            },
                        },
                        'required': ['email', 'code'],
                        'type': 'object',
                    },
                    'VerifyPhoneInput': {
                        'properties': {
                            'code': {
                                'description': 'verification code sent to the phone number to verify',
                                'example': '1ABG2C',
                                'type': 'string',
                            },
                            'phone': {
                                'description': 'phone number to verify.',
                                'example': '+37255556666',
                                'type': 'string',
                            },
                        },
                        'required': ['phone', 'code'],
                        'type': 'object',
                    },
                    'WorkingHours': {
                        'properties': {
                            'days': {
                                'items': {
                                    'type': 'number',
                                },
                                'type': 'array',
                            },
                            'endTime': {
                                'type': 'number',
                            },
                            'startTime': {
                                'type': 'number',
                            },
                            'userId': {
                                'nullable': true,
                                'type': 'number',
                            },
                        },
                        'required': ['days', 'startTime', 'endTime'],
                        'type': 'object',
                    },
                    'WorkspacePlatformDto': {
                        'properties': {
                            'name': {
                                'type': 'string',
                            },
                            'slug': {
                                'type': 'string',
                            },
                        },
                        'required': ['name', 'slug'],
                        'type': 'object',
                    },
                },
            }),
        );

        expect(tool.defs).toHaveProperty('CreateManagedUserInput');
    });
});