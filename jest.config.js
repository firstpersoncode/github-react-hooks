require('dotenv').config()
const tsconfig = require('./tsconfig.json')

module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/__core__', '<rootDir>/src'],

    // return mapped aliases matched with "module links and webpack" from tsconfig paths aliases
    // https://github.com/ryohey/tsconfig-paths-jest/blob/master/index.js
    moduleNameMapper: Object.entries(tsconfig.compilerOptions.paths)
        .map(([k, [v]]) => [`^${k.replace(/\*/, '(.*)')}`, `<rootDir>/${v.replace(/\*/, '$1')}`])
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {}),

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    testEnvironment: 'node'
}
