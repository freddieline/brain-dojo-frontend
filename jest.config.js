export default {
  preset: 'ts-jest', // Use the ESM preset
  testEnvironment:'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
  setupFilesAfterEnv:['./jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM in ts-jest
    },
  },
  rootDir: './',
  transformIgnorePatterns: ['/node_modules/', 'jest.setup.js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
};