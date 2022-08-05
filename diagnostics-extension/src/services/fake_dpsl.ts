// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Mock dpsl package.
 * To be replaced by dpsl package.
 */

import { Routine } from './fake_routine';

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000);
};

export const dpsl = {
  diagnostics: {
    battery: {
      runCapacityRoutine: async (): Promise<Routine> => {
        const routineId = generateRandomId();
        return new Routine(routineId);
      },
    },
  },
};
