module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["/frontend/**/*.{js,jsx}"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
