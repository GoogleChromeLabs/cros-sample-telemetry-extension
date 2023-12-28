// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake events data.
 */

// Fake data may not use certain parameter variables.
/* eslint-disable @typescript-eslint/no-unused-vars */

import {v4 as uuidv4} from 'uuid';
import {
  FanRoutineArgument,
  MemoryRoutineArgument,
  VolumeButtonRoutineArgument,
} from '../common/config';
import {
  RoutineV2Argument,
  RoutineV2Category,
  RoutineV2EventCategory,
  RoutineV2EventUnion,
  RoutineV2FinishedInfoUnion,
} from '../common/message';
import {
  CancelRoutineRequest,
  CreateRoutineResponse,
  MemtesterTestItemEnum,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineSupportStatus,
  RoutineSupportStatusInfo,
  RoutineWaitingInfo,
  RoutineWaitingReason,
  StartRoutineRequest,
} from '../common/telemetry-extension-types';

let routineV2Port: chrome.runtime.Port;

// Fake data to return result of running each routine.
// Maps compare reference of objects. Thus we use the JSON stringify notation to
// compare its keys.
/* eslint-disable camelcase */
const fakeRoutineData = new Map<
  string,
  {
    category: RoutineV2EventCategory;
    info: RoutineV2FinishedInfoUnion;
  }
>([
  // Fake fan routine data.
  [
    JSON.stringify({
      category: RoutineV2Category.fan,
      argument: FanRoutineArgument,
    }),
    {
      category: RoutineV2EventCategory.fanFinished,
      info: {
        uuid: '',
        has_passed: true,
        passed_fan_ids: [0, 1],
        failed_fan_ids: [],
      },
    },
  ],
  // Fake memory routine data.
  [
    JSON.stringify({
      category: RoutineV2Category.memory,
      argument: MemoryRoutineArgument,
    }),
    {
      category: RoutineV2EventCategory.memoryFinished,
      info: {
        uuid: '',
        has_passed: true,
        bytesTested: 1000,
        result: {
          passed_items: [MemtesterTestItemEnum.stuck_address],
          failed_items: [],
        },
      },
    },
  ],
  // Fake volume button routine data.
  [
    JSON.stringify({
      category: RoutineV2Category.volumeButton,
      argument: VolumeButtonRoutineArgument,
    }),
    {
      category: RoutineV2EventCategory.memoryFinished,
      info: {
        uuid: '',
        has_passed: true,
      },
    },
  ],
]);
/* eslint-disable camelcase */

const uuidToFakeRoutine = new Map<string, FakeRoutine>();
// Send fake data every fakeDataInterval milliseconds.
const fakeDataInterval: number = 1000;
// Each fake data update will have a percentageIncrement increase.
const percentageIncrement: number = 25;

enum RoutineState {
  initialized = 'initialized',
  running = 'running',
  waiting = 'waiting',
  exception = 'exception',
}

abstract class FakeRoutine {
  abstract startRoutine();
  abstract cancelRoutine();
}

class FakeGenericRoutine {
  routineState: RoutineState;
  percentage: number;
  uuid: string;
  routineArgument: RoutineV2Argument;
  routineFinishedEventCategory: RoutineV2EventCategory;
  routineFinishedInfo: RoutineV2FinishedInfoUnion;
  pendingTimeout?: ReturnType<typeof setTimeout>;

  public constructor(
    uuid: string,
    routineArgument: RoutineV2Argument,
    routineFinishedEventCategory: RoutineV2EventCategory,
    routineFinishedInfo: RoutineV2FinishedInfoUnion,
  ) {
    this.uuid = uuid;
    this.routineArgument = routineArgument;
    this.routineFinishedInfo = routineFinishedInfo;
    this.routineFinishedEventCategory = routineFinishedEventCategory;
    this.routineState = RoutineState.initialized;
    this.percentage = 0;

    // Send initialized event.
    const routineInitializedInfo: RoutineInitializedInfo = {uuid: this.uuid};
    notifyPort(RoutineV2EventCategory.initialized, routineInitializedInfo);
  }

  public startRoutine() {
    // Send waiting for resource queue event.
    const routineWaitingInfo: RoutineWaitingInfo = {
      uuid: this.uuid,
      percentage: 0,
      reason: RoutineWaitingReason.waiting_to_be_scheduled,
      message: 'waiting for resource queue',
    };
    notifyPort(RoutineV2EventCategory.waiting, routineWaitingInfo);
    this.pendingTimeout = setTimeout(
      () => this._sendRunning(),
      fakeDataInterval,
    );
  }

  private _sendRunning() {
    this.percentage += percentageIncrement;
    if (this.percentage >= 100) {
      this.sendFinished();
      return;
    }
    // Send running event.
    const routineRunningInfo: RoutineRunningInfo = {
      uuid: this.uuid,
      percentage: this.percentage,
    };
    notifyPort(RoutineV2EventCategory.running, routineRunningInfo);
    this.pendingTimeout = setTimeout(
      () => this._sendRunning(),
      fakeDataInterval,
    );
  }

  private sendFinished() {
    notifyPort(this.routineFinishedEventCategory, this.routineFinishedInfo);
  }

  public cancelRoutine() {
    if (this.pendingTimeout !== undefined) clearTimeout(this.pendingTimeout);
  }
}

export function registerEventHandlers(): void {
  return;
}

export function registerPort(port: chrome.runtime.Port): void {
  routineV2Port = port;
  return;
}

function notifyPort(
  eventCategory: RoutineV2EventCategory,
  event: RoutineV2EventUnion,
): void {
  if (!routineV2Port) {
    return;
  }
  routineV2Port.postMessage({
    eventCategory: eventCategory,
    event: event,
  });
  return;
}

function getFakeData(
  argument: RoutineV2Argument,
  uuid: string,
): {
  category: RoutineV2EventCategory;
  info: RoutineV2FinishedInfoUnion;
} {
  const argumentStr: string = JSON.stringify(argument);
  if (fakeRoutineData.has(argumentStr)) {
    const fakeCategory = fakeRoutineData.get(argumentStr)!.category;
    const fakeFinishedInfo = fakeRoutineData.get(argumentStr)!.info;
    fakeFinishedInfo.uuid = uuid;
    return {category: fakeCategory, info: fakeFinishedInfo};
  }
  return {
    category: RoutineV2EventCategory.fanFinished,
    // eslint-disable-next-line camelcase
    info: {uuid: uuid, has_passed: true},
  };
}

// Default to support all routines in fake data.
export async function isRoutineArgumentSupported(
  routineArgument: RoutineV2Argument,
): Promise<RoutineSupportStatusInfo> {
  const res: RoutineSupportStatusInfo = {
    status: RoutineSupportStatus.supported,
  };
  return res;
}

export async function createRoutine(
  routineArgument: RoutineV2Argument,
): Promise<CreateRoutineResponse> {
  const uuid = uuidv4();
  const fakeRoutine = new FakeGenericRoutine(
    uuid,
    routineArgument,
    getFakeData(routineArgument, uuid).category,
    getFakeData(routineArgument, uuid).info,
  );
  uuidToFakeRoutine.set(uuid, fakeRoutine);
  return {uuid: uuid};
}

export async function startRoutine(
  startRoutineRequest: StartRoutineRequest,
): Promise<void> {
  uuidToFakeRoutine.get(startRoutineRequest.uuid)?.startRoutine();
}

export async function cancelRoutine(
  cancelRoutineRequest: CancelRoutineRequest,
): Promise<void> {
  uuidToFakeRoutine.get(cancelRoutineRequest.uuid)?.cancelRoutine();
  // Delete the fake routine, should stop all related functions from running.
  uuidToFakeRoutine.delete(cancelRoutineRequest.uuid);
}
