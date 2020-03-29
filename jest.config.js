// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
    '!src/**/*.style.js',
    '!src/App.js',
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
    'src/App.js',
    'serc/firebase.js',
    'src/contexts',
    'src/routes',
    'src/shared/hooks',
    'src/shared/utils/testHelpers',
    '<rootDir>/src/*.js',
    '<rootDir>/src/*/*.style.js',
    'index.js',
  ],
  setupFilesAfterEnv: ['./setupTests.js', './__mocks__/firebase.js'],
}
