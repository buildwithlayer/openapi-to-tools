[![npm version](https://badge.fury.io/js/@buildwithlayer%2Fopenapi-to-tools.svg)](https://badge.fury.io/js/@buildwithlayer%2Fopenapi-to-tools)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# OpenAPI to Tools

> This is a simple package to convert OpenAPI routes to tools to be used by MCP servers or other LLM applications.

## Prerequisites

This project requires NodeJS (version 18 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
10.2.4
v20.11.0
```

## Table of contents

- [OpenAPI to Tools](#openapi-to-tools)
    - [Prerequisites](#prerequisites)
    - [Table of contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
        - [CLI](#cli)
        - [MCP Server](#mcp-server)
    - [Contributing](#contributing)
    - [Versioning](#versioning)
    - [License](#license)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install @buildwithlayer/openapi-to-tools
```

Or if you prefer using Yarn:

```sh
$ yarn add @buildwithlayer/openapi-to-tools
```

## Usage

### CLI

- `input_file_path` is a path to any valid OpenAPI Spec 3.X.X
- `output_file_path` is a path to a JSON file to write the tools

```shell
npx @buildwithlayer/openapi-to-tools <input_file_path> [-o <output_file_path>]
```

### MCP Server

```ts
import {addAPIToolsPlugin} from '@buildwithlayer/openapi-to-tools/index.js';
import {apiTools} from './tools.json';

const server = new McpServer(
    {
        name: 'very-cool-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

// Add any manual tools
server.tool('hello-world', async () => ({
    content: [
        {
            text: 'Hello, world!',
            type: 'text',
        },
    ],
}));

// Add the API tools (generated with CLI or using the library)
addAPIToolsPlugin(server, apiTools);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Contributing

> These instructions will be updated *soon*.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/buildwithlayer/openapi-to-tools/tags).

## License

Currently, this is unlicensed and requires explicit permission to use.
In the future, we will open up this license.