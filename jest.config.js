module.exports = {
  displayName: 'nodejs-playground',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  rootDir: __dirname,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFiles: ['dotenv/config'],
  maxConcurrency: 1,
};
