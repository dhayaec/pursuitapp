module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  modulePaths: ['<rootDir>/src/'],
  coveragePathIgnorePatterns: ['./src/db.ts'],
};
