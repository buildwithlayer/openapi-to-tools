import {OpenAPISpec, upgrade} from '@buildwithlayer/openapi-zod-spec';
import {parseToolsFromSpec} from '../src';
import openapi from './openapi.json';

describe('parseToolsFromSpec', () => {
    const spec = upgrade(OpenAPISpec.parse(openapi));

    test('should parse tools from spec', () => {
        const tools = parseToolsFromSpec(spec);
        const getManagedUsers = tools.find(tool => tool.name === 'OAuthClientUsersController_createUser');
        expect(getManagedUsers).toBeDefined();
    });
});