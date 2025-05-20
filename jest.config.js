import {createDefaultEsmPreset} from 'ts-jest';

const defaultEsmPreset = createDefaultEsmPreset();

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    ...defaultEsmPreset,
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {tsconfig: 'tsconfig.cjs.json'}],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!eventsource)/',
    ],
};