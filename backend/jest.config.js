module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      '**/src/**/*.test.ts',
    ],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  