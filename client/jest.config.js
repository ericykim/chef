module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  // moduleNameMapper: {
  //   '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  // },
  collectCoverage: false,
  // collectCoverageFrom: ['./src/**/*.js', '!**/node_modules/**'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
