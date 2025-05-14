import {Parameter} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/parameter.js';
import {Schema} from '@buildwithlayer/openapi-zod-spec/dist/3/1/1/schema.js';

export type MethodType = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put' | 'trace';

export interface BaseAuth {
    description?: string;
    key: string;
}

export interface BearerAuth extends BaseAuth {
    bearerFormat?: string;
    scheme: 'bearer';
    type: 'http';
}

export interface BasicAuth extends BaseAuth {
    scheme: 'basic';
    type: 'http';
}

export interface APIKeyAuth extends BaseAuth {
    in?: 'cookie' | 'header' | 'query';
    name: string;
    type: 'apiKey';
}

export type ToolAuth = BearerAuth | BasicAuth | APIKeyAuth;

export type APITool = {
    auth?: ToolAuth[];
    body?: Schema;
    contentType?: 'application/json' | 'application/x-www-form-urlencoded';
    defs?: Record<string, Schema>;
    description: string;
    method: MethodType;
    name: string;
    params?: Parameter[];
    url: string;
}