module.exports = {
    // Automatically reset mocks before each test
    resetMocks: true,
  
    // Specify the test environment
    testEnvironment: 'jsdom',  // Needed for DOM manipulations in tests
  
    // Set up files after the environment is set
    setupFilesAfterEnv: ['./src/setupTests.js'],  // Path to your setupTests.js
  
    // Optionally, configure other settings such as coverage, testing patterns, etc.
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'html', 'text'],
  };