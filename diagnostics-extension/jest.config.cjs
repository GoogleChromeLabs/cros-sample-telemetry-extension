/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/* eslint-disable */

const path = require("path")

module.exports = {
  preset : 'ts-jest',
  testEnvironment : 'node',
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/setup.js"]
};
