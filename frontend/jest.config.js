module.exports = {
  setupFilesAfterEnv: ["./src/jest.setup.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};

// export const setupFilesAfterEnv = ["./src/jest.setup.js"];
// export const transform = {
//   "^.+\\.[t|j]sx?$": "babel-jest",
// };
// export const testEnvironment = "jsdom";
