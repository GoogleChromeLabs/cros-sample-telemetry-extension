// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview chrome.os.diagnostics* types definitions, only for routine v2
 * APIs.
 */

export interface RoutineInitializedInfo {
  uuid?: string;
}

export interface RoutineRunningInfo {
  uuid?: string;
  percentage?: number;
}

export enum RoutineWaitingReason {
  waiting_to_be_scheduled = 'waiting_to_be_scheduled',
  waiting_user_input = 'waiting_user_input',
}

export interface RoutineWaitingInfo {
  uuid?: string;
  percentage?: number;
  // Reason why the routine waits.
  reason?: RoutineWaitingReason;
  // Additional information, may be used to pass instruction or explanation.
  message?: string;
}

enum ExceptionReason {
  unknown,
  // Any other exceptions that we don't expect to happen. Clients should
  // simply report the error.
  unexpected,
  // Raises this if clients try to run an unsupported feature. Note that
  // clients should use methods which return `SupportStatus` for
  // support status check.
  unsupported,
  // The corresponding App UI was closed and thus stopped the routine
  // execution.
  app_ui_closed,
}

export interface ExceptionInfo {
  uuid?: string;
  reason: ExceptionReason;
  // A human readable message for debugging. Don't rely on the content because
  // it could change anytime.
  debugMessage?: string;
}

export enum MemtesterTestItemEnum {
  // The memtester test is not recognized.
  unknown = 'unknown',

  // Test that all memory addresses to be tested can be set to itself and its
  // complement.
  stuck_address = 'stuck_address',

  // These tests test different operation of a random int64 with buffer
  // initialized as 0xFFFFFFFF, repeating over 64 bit blocks.
  // Perform AND operation.
  compare_and = 'compare_and',
  // Perform DIV operation.
  compare_div = 'compare_div',
  // Perform MUL operation.
  compare_mul = 'compare_mul',
  // Perform OR operation.
  compare_or = 'compare_or',
  // Perform SUB operation.
  compare_sub = 'compare_sub',
  // Perform XOR operation.
  compare_xor = 'compare_xor',
  // Perform ADD operation.
  sequential_increment = 'sequential_increment',

  // These tests test setting memory regions in a certain pattern, repeating
  // over each 64 bit blocks.
  // Test Pattern: |0*10*| and |1*01*|.
  bit_flip = 'bit_flip',
  // Test Pattern:|0*1010*| and |1*0101*|.
  bit_spread = 'bit_spread',
  // Test Pattern: all 256 possible combinations of a 8 bit block, repeated 8
  // times.
  block_sequential = 'block_sequential',
  // Test Pattern: Alternating 0 and 1.
  checkerboard = 'checkerboard',
  // Test Pattern: Random 64 bits.
  random_value = 'random_value',
  // Test Pattern: all 0s and all 1s.
  solid_bits = 'solid_bits',
  // Test Pattern: |0*10*|.
  walking_ones = 'walking_ones',
  // Test Pattern: |1*01*|.
  walking_zeroes = 'walking_zeroes',

  // These tests test writing random n bit words across the memory regions.
  // Test Pattern: 8 bit random words.
  eight_bit_writes = 'eight_bit_writes',
  // Test Pattern: 16 bit random words.
  sixteen_bit_writes = 'sixteen_bit_writes',
}

export interface MemtesterResult {
  passedItems: MemtesterTestItemEnum[];
  failedItems: MemtesterTestItemEnum[];
}

export interface MemoryRoutineFinishedDetail {
  // Number of bytes tested in the memory routine.
  bytesTested?: number;
  // Contains the memtester test results.
  result?: MemtesterResult;
}

export interface CreateMemoryRoutineArguments {
  // An optional field to indicate how much memory should be tested. If the
  // value is null, memory test will run with as much memory as possible.
  maxTestingMemKib?: number;
}

export enum VolumeButtonType {
  // The volume up button.
  volume_up = 'volume_up',
  // The volume down button.
  volume_down = 'volume_down',
}

export interface CreateVolumeButtonRoutineArguments {
  // The volume button to be tested.
  buttonType: VolumeButtonType;
  // Length of time to listen to the volume button events. The value should be
  // positive and less or equal to 600 seconds.
  timeoutSeconds: number;
}

export enum HardwarePresenceStatus {
  // The hardware presence matches the description.
  matched = 'matched',
  // The hardware presence does not match the description.
  not_matched = 'not_matched',
  // There is no description available, skipping check.
  not_configured = 'not_configured',
}

export interface FanRoutineFinishedDetail {
  // The ids of fans that can be controlled.
  passedFanIds?: number[];
  // The ids of fans that cannot be controlled.
  failedFanIds?: number[];
  // Whether the number of fan probed is matched.
  fanCountStatus?: HardwarePresenceStatus;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateFanRoutineArguments {}

export interface CreateRoutineResponse {
  uuid?: string;
}

export enum RoutineSupportStatus {
  supported = 'supported',
  unsupported = 'unsupported',
}

export interface RoutineSupportStatusInfo {
  status?: RoutineSupportStatus;
}

export interface StartRoutineRequest {
  uuid: string;
}

export interface CancelRoutineRequest {
  uuid: string;
}

// This is a union type. Exactly one field should be set.
export interface CreateRoutineArgumentsUnion {
  memory?: CreateMemoryRoutineArguments;
  volumeButton?: CreateVolumeButtonRoutineArguments;
  fan?: CreateFanRoutineArguments;
}

// This is a union type. Exactly one field should be set.
export interface RoutineFinishedDetailUnion {
  memory?: MemoryRoutineFinishedDetail;
  fan?: FanRoutineFinishedDetail;
}

export interface RoutineFinishedInfo {
  uuid?: string;
  hasPassed?: boolean;
  detail?: RoutineFinishedDetailUnion;
}
