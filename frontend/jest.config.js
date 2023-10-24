module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["/frontend/**/*.{js,jsx}"],
  coverageProvider: "v8",
  setupFilesAfterEnv: ["./src/jest.setup.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
