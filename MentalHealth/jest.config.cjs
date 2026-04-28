module.exports = {
  testEnvironment: 'jsdom', // simulate browser environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // handle CSS imports
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
