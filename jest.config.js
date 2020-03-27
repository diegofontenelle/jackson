// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
    '!src/**/*.style.js',
  ],
  coveragePathIgnorePatterns: [
    'src/contexts',
    'src/routes',
    'src/shared/hooks',
    'src/shared/utils/testHelpers',
    'src/*.js',
    '<rootDir>/src/*/*.style.js',
    'index.js',
  ],
  testPathIgnorePatterns: [
    'src/contexts',
    'src/routes',
    'src/shared/hooks',
    'src/shared/utils/testHelpers',
    '<rootDir>/src/*.js',
    '<rootDir>/src/*/*.style.js',
    'index.js',
  ],
  coverageThreshold: {
    global: {
      statements: -10,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
}
