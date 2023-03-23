export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx|js)"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  }
} 