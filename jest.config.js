module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
      '**/*.(t|j)s',
      '!**/*.module.(t|j)s',
      '!**/main.(t|j)s',
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  };
  