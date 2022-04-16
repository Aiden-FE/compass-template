module.exports = {
    preset: 'ts-jest',
    globals: {},
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "^~/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
        '.+\\.(css|scss|styl|png|jpg|svg)$': 'jest-transform-stub'
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss|less)$',
    ],
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
}
