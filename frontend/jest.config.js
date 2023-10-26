module.exports = {
  setupFilesAfterEnv: ["./src/jest.setup.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
