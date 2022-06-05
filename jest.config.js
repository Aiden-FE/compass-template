module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src/$1"
    },
    testMatch: [
        "<rootDir>/src/**/*.spec.ts"
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts'
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json'
        }
    },
    preset: 'ts-jest',
    "rootDir": ".",
}
