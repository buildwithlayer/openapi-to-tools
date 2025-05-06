# OpenAPI to MCP Tools

[![npm version](https://badge.fury.io/js/%40buildwithlayer%2Fopenapi-to-tools.svg)](https://badge.fury.io/js/%40buildwithlayer%2Fopenapi-to-tools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/buildwithlayer/openapi-to-tools.svg)](https://github.com/buildwithlayer/openapi-to-tools/commits/main)

A command-line tool to convert OpenAPI (v3.x) specifications (JSON or YAML) into Model Context Protocol (MCP) compliant tool definitions.

## Installation
```bash
npm install @buildwithlayer/openapi-to-tools
```

## Usage (npx)

You can execute this package using `npx` to test it out:
```bash
npx @buildwithlayer/openapi-to-tools <input_file_path>
```

Use `-o` or `--output` to output tools to a file.

## Usage (as package)

```typescript
import { parseToolsFromSpec } from '@buildwithlayer/openapi-to-tools';
import { OpenAPI } from '@buildwithlayer/openapi-zod-spec'; 

const minimalOpenAPISpec: OpenAPI = {
  openapi: '3.0.0',
  info: {
    title: 'Minimal Example API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://api.example.com/v1',
    },
  ],
  paths: {
    '/ping': {
      get: {
        operationId: 'healthCheck',
        summary: 'Simple health check endpoint',
        responses: {
          '200': {
            description: 'API is healthy',
          },
        },
      },
    },
  },
};

const apiTools = parseToolsFromSpec(minimalOpenAPISpec);
console.log(JSON.stringify(apiTools, null, 2));  // pretty print tools

/*
Expected:

[
  {
    "method": "GET",
    "tool": {
      "description": "Simple health check endpoint",
      "inputSchema": {
        "type": "object"
      },
      "name": "healthCheck"
    },
    "url": "https://api.example.com/v1/ping"
  }
]
**/
```

## 🔨 Tool Schema
Because traditional MCP tools are not sufficient to represent API calls, we create an embellished interface called `ApiTool` which is a simple wrapper around the official MCP `ToolSchema` interface:

```typescript
export interface ApiTool {
    method: string;
    tool: ToolSchema;   // MCP Tool Schema
    url: string;
}
```

# 🤝 Contributing
Contributions are welcome!
- Fork the repo
- Create a feature branch: git checkout -b feature/amazing-feature
- Commit your changes: git commit -m "Add amazing feature"
- Push and open a PR