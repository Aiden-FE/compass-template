const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.spec')

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testMatch: [
    "<rootDir>/test/**/*.spec.ts"
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
      tsConfig: 'tsconfig.spec.json'
    }
  }
}
