module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // Other Jest configuration options...
};
