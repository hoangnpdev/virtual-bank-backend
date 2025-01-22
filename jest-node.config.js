const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: '.',
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1',
  // }
})
 
// Add any custom config to be passed to Jest
const config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  coverageProvider: 'v8',
  testEnvironment: 'node',
  // testMatch: ['<rootDir>/__tests__/app/**/*.js']
  testMatch: ['<rootDir>/__tests__/domain/**/*.js'],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
