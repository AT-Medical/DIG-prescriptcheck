/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>/backend/tests',
    '<rootDir>/src/backend/tests',
  ],
  testMatch: [
    '**/*.test.js',
    '**/*Test.js',
  ],
  collectCoverageFrom: [
    'backend/**/*.js',
    'src/backend/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/*.test.js',
    '!backend/cli/**',
    '!backend/seeds/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testTimeout: 10000,
  forceExit: true,
};
