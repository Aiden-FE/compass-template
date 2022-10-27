module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    },
    testMatch: [
        "<rootDir>/src/**/*.spec.ts"
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.node.json' }]
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts'
    ],
    preset: 'ts-jest',
    "rootDir": ".",
}
