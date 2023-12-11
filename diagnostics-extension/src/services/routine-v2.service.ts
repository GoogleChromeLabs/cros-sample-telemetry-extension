// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to events
 */

// The API calls to chrome.os* are not defined in the standard chrome type.
// Allow type-casting into any for access.
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RoutineV2Argument,
  RoutineV2ArgumentUnion,
  RoutineV2Category,
  RoutineV2Event,
  RoutineV2EventCategory,
  RoutineV2EventUnion,
} from '../common/message';
import {
  CancelRoutineRequest,
  CreateRoutineResponse,
  RoutineSupportStatusInfo,
  StartRoutineRequest,
} from '../common/telemetry-extension-types';
import {environment} from '../environments/environment';
import * as fakeRoutineV2 from './fake-routine-v2.service';

/**
 * Abstract class reprensenting the interface of
 * service to handle events
 */
export abstract class RoutineV2Service {
  abstract registerRoutineV2EventHandlers(): void;
  abstract registerPort(port: chrome.runtime.Port): void;
  abstract isRoutineArgumentSupported(
    routineArgument: RoutineV2Argument,
  ): Promise<RoutineSupportStatusInfo>;
  abstract createRoutine(
    routineArgument: RoutineV2Argument,
  ): Promise<CreateRoutineResponse>;
  abstract startRoutine(
    startRoutineRequest: StartRoutineRequest,
  ): Promise<void>;
  abstract cancelRoutine(
    cancelRoutineRequest: CancelRoutineRequest,
  ): Promise<void>;
}

/**
 * Implementation of RoutineV2Service
 * @extends RoutineV2Service
 */
export class RoutineV2ServiceImpl extends RoutineV2Service {
  private port!: chrome.runtime.Port;

  private routineCategoryToMethods = new Map<
    RoutineV2Category,
    {
      createRoutineFunc: (
        runRoutineArgument: RoutineV2ArgumentUnion,
      ) => Promise<CreateRoutineResponse>;
      isRoutineArgumentSupportedFunc: (
        runRoutineArgument: RoutineV2ArgumentUnion,
      ) => Promise<RoutineSupportStatusInfo>;
    }
  >([
    [
      RoutineV2Category.fan,
      {
        createRoutineFunc: (chrome as any).os.diagnostics.createFanRoutine,
        isRoutineArgumentSupportedFunc: (chrome as any).os.diagnostics
          .isFanRoutineArgumentSupported,
      },
    ],
    [
      RoutineV2Category.memory,
      {
        createRoutineFunc: (chrome as any).os.diagnostics.createMemoryRoutine,
        isRoutineArgumentSupportedFunc: (chrome as any).os.diagnostics
          .isMemoryRoutineArgumentSupported,
      },
    ],
    [
      RoutineV2Category.volumeButton,
      {
        createRoutineFunc: (chrome as any).os.diagnostics
          .createVolumeButtonRoutine,
        isRoutineArgumentSupportedFunc: (chrome as any).os.diagnostics
          .isVolumeButtonRoutineArgumentSupported,
      },
    ],
  ]);

  private routineEventListeners = new Map<RoutineV2EventCategory, any>([
    [
      RoutineV2EventCategory.initialized,
      (chrome as any).os.diagnostics.onRoutineInitialized,
    ],
    [
      RoutineV2EventCategory.running,
      (chrome as any).os.diagnostics.onRoutineRunning,
    ],
    [
      RoutineV2EventCategory.waiting,
      (chrome as any).os.diagnostics.onRoutineWaiting,
    ],
    [
      RoutineV2EventCategory.memoryFinished,
      (chrome as any).os.diagnostics.onMemoryRoutineFinished,
    ],
    [
      RoutineV2EventCategory.volumeButtonFinished,
      (chrome as any).os.diagnostics.onVolumeButtonRoutineFinished,
    ],
    [
      RoutineV2EventCategory.fanFinished,
      (chrome as any).os.diagnostics.onFanRoutineFinished,
    ],
    [
      RoutineV2EventCategory.exception,
      (chrome as any).os.diagnostics.onRoutineException,
    ],
  ]);

  private notifyPort = (
    eventCategory: RoutineV2EventCategory,
    event: RoutineV2EventUnion,
  ) => {
    if (!this.port) {
      console.error('port not established');
      return;
    }
    // All events must have a UUID to match it to the corresponding routine.
    if (!event.uuid) {
      console.error('Routine event must have an associated uuid');
      return;
    }
    const routineV2Event: RoutineV2Event = {
      eventCategory: eventCategory,
      event: event,
    };
    this.port.postMessage(routineV2Event);
    return;
  };

  registerPort = (port: chrome.runtime.Port): void => {
    this.port = port;
  };

  registerRoutineV2EventHandlers = (): void => {
    try {
      for (const [eventCategory, routineEventListener] of this
        .routineEventListeners) {
        routineEventListener.addListener(
          this.notifyPort.bind(null, eventCategory),
        );
      }
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  };

  isRoutineArgumentSupported = (
    routineArgument: RoutineV2Argument,
  ): Promise<RoutineSupportStatusInfo> => {
    if (!this.routineCategoryToMethods.has(routineArgument.category)) {
      return Promise.reject('invalid routine category');
    }
    return this.routineCategoryToMethods
      .get(routineArgument.category)!
      .isRoutineArgumentSupportedFunc(routineArgument.argument);
  };

  createRoutine = async (
    routineArgument: RoutineV2Argument,
  ): Promise<CreateRoutineResponse> => {
    if (!this.routineCategoryToMethods.has(routineArgument.category)) {
      return Promise.reject('invalid routine category');
    }
    return this.routineCategoryToMethods
      .get(routineArgument.category)!
      .createRoutineFunc(routineArgument.argument);
  };

  startRoutine = async (
    startRoutineRequest: StartRoutineRequest,
  ): Promise<void> => {
    return (chrome as any).os.diagnostics.startRoutine(startRoutineRequest);
  };

  cancelRoutine = async (
    cancelRoutineRequest: CancelRoutineRequest,
  ): Promise<void> => {
    return (chrome as any).os.diagnostics.cancelRoutine(cancelRoutineRequest);
  };
}

/**
 * Fake implementation of RoutineV2Service
 * @extends RoutineV2Service
 */
export class FakeRoutineV2Service implements RoutineV2Service {
  registerRoutineV2EventHandlers(): void {
    return fakeRoutineV2.registerEventHandlers();
  }
  registerPort(port: chrome.runtime.Port): void {
    return fakeRoutineV2.registerPort(port);
  }
  isRoutineArgumentSupported(
    routineArgument: RoutineV2Argument,
  ): Promise<RoutineSupportStatusInfo> {
    return fakeRoutineV2.isRoutineArgumentSupported(routineArgument);
  }
  createRoutine(
    routineArgument: RoutineV2Argument,
  ): Promise<CreateRoutineResponse> {
    return fakeRoutineV2.createRoutine(routineArgument);
  }
  startRoutine(startRoutineRequest: StartRoutineRequest): Promise<void> {
    return fakeRoutineV2.startRoutine(startRoutineRequest);
  }
  cancelRoutine(cancelRoutineRequest: CancelRoutineRequest): Promise<void> {
    return fakeRoutineV2.cancelRoutine(cancelRoutineRequest);
  }
}

export class RoutineV2ServiceProvider {
  private static instance: RoutineV2Service;

  public static getRoutineV2Service(): RoutineV2Service {
    if (!this.instance) {
      if (environment.testModeEnabled) {
        this.instance = new FakeRoutineV2Service();
      } else {
        this.instance = new RoutineV2ServiceImpl();
      }
    }
    return this.instance;
  }
}
