const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@data/(.*)$": "<rootDir>/src/data/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",  
    "^@providers/(.*)$": "<rootDir>/src/providers/$1",  
    "^@stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@customTypes/(.*)$": "<rootDir>/src/types/$1",
    '^@pages/(.*)$': '<rootDir>/pages/$1'
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
