module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  coveragePathIgnorePatterns: ['./src/db.ts']
};
