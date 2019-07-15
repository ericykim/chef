module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['../jest.setup.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  verbose: false,
};
