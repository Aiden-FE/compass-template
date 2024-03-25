module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  preset: 'ts-jest',
  rootDir: '.',
  // 单测覆盖率限制
  // coverageThreshold: {
  //     "global": {
  //         "branches": 100,
  //         "functions": 100,
  //         "lines": 100,
  //         "statements": 100
  //     }
  // },
};
