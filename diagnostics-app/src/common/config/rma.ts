// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Some V1 APIs does not have camelCase naming. Disable the linter check.
/* eslint-disable camelcase */

import {
  DiagnosticsParamsUnion,
  RoutineV2Argument,
  RoutineV2Category,
} from '../message';
import {RoutineType, VolumeButtonType} from '../telemetry-extension-types';

export interface RoutineV1TestArgument {
  category: RoutineType;
  argument: DiagnosticsParamsUnion;
}

export enum RmaTestType {
  DIAGNOSTICS,
  ROUTINE_V2,
  CAMERA,
  AUDIO,
}

export interface TestConfig {
  // Name of the test to be displayed
  title: string;
  // Whether the test is enabled
  enabled: boolean;
  // Either calling the diagnostics API through telemetry extension, or a custom test that is written locally.
  testType: RmaTestType;
  // The argument needed to run the requested test. Argument may be null if
  // not needed.
  testArgument: RoutineV1TestArgument | RoutineV2Argument | null;
  // This field will be filled at runtime depending on device config.
  supported?: boolean | null;
}

export const TestList: TestConfig[] = [
  {
    title: 'Custom Camera Test',
    enabled: true,
    testType: RmaTestType.CAMERA,
    testArgument: null,
  },
  {
    title: 'Custom Audio Test',
    enabled: true,
    testType: RmaTestType.AUDIO,
    testArgument: null,
  },
  {
    title: 'Memory Test V2',
    enabled: true,
    testType: RmaTestType.ROUTINE_V2,
    testArgument: {
      category: RoutineV2Category.MEMORY,
      argument: {
        maxTestingMemKib: 10000,
      },
    },
  },
  {
    title: 'Fan Test V2',
    enabled: true,
    testType: RmaTestType.ROUTINE_V2,
    testArgument: {
      category: RoutineV2Category.FAN,
      argument: {},
    },
  },
  {
    title: 'Volume Button Test V2',
    enabled: true,
    testType: RmaTestType.ROUTINE_V2,
    testArgument: {
      category: RoutineV2Category.VOLUME_BUTTON,
      argument: {
        button_type: VolumeButtonType.volume_up,
        timeout_seconds: 10,
      },
    },
  },
  {
    title: 'CPU Stress Test V1',
    enabled: true,
    testType: RmaTestType.DIAGNOSTICS,
    testArgument: {
      category: RoutineType.cpu_stress,
      argument: {
        length_seconds: 10,
      },
    },
  },
  {
    title: 'CPU Cache Test V1',
    enabled: true,
    testType: RmaTestType.DIAGNOSTICS,
    testArgument: {
      category: RoutineType.cpu_cache,
      argument: {
        length_seconds: 10,
      },
    },
  },
  {
    title: 'Prime Search Test V1',
    enabled: true,
    testType: RmaTestType.DIAGNOSTICS,
    testArgument: {
      category: RoutineType.cpu_prime_search,
      argument: {
        length_seconds: 10,
      },
    },
  },
  {
    title: 'Floating Point Test V1',
    enabled: true,
    testType: RmaTestType.DIAGNOSTICS,
    testArgument: {
      category: RoutineType.cpu_floating_point_accuracy,
      argument: {
        length_seconds: 10,
      },
    },
  },
];
