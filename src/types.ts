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