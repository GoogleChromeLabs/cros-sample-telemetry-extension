/* eslint-disable */

const path = require("path")

module.exports = {
  preset : 'ts-jest',
  testEnvironment : 'node',
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/setup.js"]
};
