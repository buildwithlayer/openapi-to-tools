#!/usr/bin/env node
import {OpenAPISpec, upgrade} from '@buildwithlayer/openapi-zod-spec/index.js';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import {parseToolsFromSpec} from './index.js';

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: openapi-to-tools <input_file_path> [-o <output_file_path>]

Arguments:
  input_file_path     Path to the OpenAPI specification file (JSON or YAML).
  -o, --output        Optional. Path to the output JSON file. If not provided, output will be printed to stdout.
  -h, --help          Show this help message.
`);
    process.exit(0);
}

const inputFilePath = args[0];
let outputFilePath: string | undefined;

const outputFlagIndex = args.findIndex(arg => arg === '-o' || arg === '--output');
if (outputFlagIndex !== -1 && args[outputFlagIndex + 1]) {
    outputFilePath = args[outputFlagIndex + 1];
} else if (outputFlagIndex !== -1) {
    console.error('Error: Output file path must be specified after -o or --output flag.');
    process.exit(1);
}

if (!fs.existsSync(inputFilePath)) {
    console.error(`Error: Input file not found at ${inputFilePath}`);
    process.exit(1);
}

try {
    const fileContents = fs.readFileSync(inputFilePath, 'utf-8');
    const fileExtension = path.extname(inputFilePath).toLowerCase();

    let spec: OpenAPISpec;
    if (fileExtension === '.yaml' || fileExtension === '.yml') {
        spec = OpenAPISpec.parse(yaml.load(fileContents));
    } else if (fileExtension === '.json') {
        spec = OpenAPISpec.parse(JSON.parse(fileContents));
    } else {
        // Try parsing as JSON, then YAML as a fallback
        try {
            spec = OpenAPISpec.parse(JSON.parse(fileContents));
        } catch (jsonError) {
            try {
                spec = OpenAPISpec.parse(yaml.load(fileContents));
            } catch (yamlError) {
                console.error('Error: Could not parse input file. Ensure it is valid JSON or YAML.');
                console.error('JSON parsing error:', (jsonError as Error).message);
                console.error('YAML parsing error:', (yamlError as Error).message);
                process.exit(1);
            }
        }
    }

    spec = upgrade(spec);
    const tools = parseToolsFromSpec(spec);
    const outputJson = JSON.stringify(tools, null, 2);

    if (outputFilePath) {
        fs.writeFileSync(outputFilePath, outputJson);
        console.log(`Successfully wrote tools to ${outputFilePath}`);
    } else {
        console.log(outputJson);
    }
} catch (error) {
    console.error('An error occurred during processing:');
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error(String(error));
    }
    process.exit(1);
}