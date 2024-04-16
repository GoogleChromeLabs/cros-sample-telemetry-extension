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
  PortName,
  RoutineV2Event,
  RoutineV2EventCategory,
  RoutineV2EventUnion,
} from '../common/message';
import {
  CancelRoutineRequest,
  CreateRoutineArgumentsUnion,
  CreateRoutineResponse,
  RoutineSupportStatusInfo,
  StartRoutineRequest,
} from '../common/telemetry-extension-types/routines';
import {environment} from '../environments/environment';
import * as fakeRoutineV2 from './fake-routine-v2.service';
import {PortService} from './port.service';

/**
 * Abstract class reprensenting the interface of
 * service to handle events
 */
export abstract class RoutineV2Service {
  abstract registerRoutineV2EventHandlers(): void;
  abstract isRoutineArgumentSupported(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<RoutineSupportStatusInfo>;
  abstract createRoutine(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<CreateRoutineResponse>;
  abstract startRoutine(
    startRoutineRequest: StartRoutineRequest,
  ): Promise<void>;
  abstract cancelRoutine(
    cancelRoutineRequest: CancelRoutineRequest,
  ): Promise<void>;

  getPort(): chrome.runtime.Port | undefined {
    return PortService.getInstance().getPort(PortName.ROUTINE_V2_PORT);
  }
}

/**
 * Implementation of RoutineV2Service
 * @extends RoutineV2Service
 */
export class RoutineV2ServiceImpl extends RoutineV2Service {
  private routineEventListeners = new Map<RoutineV2EventCategory, any>([
    [
      RoutineV2EventCategory.INITIALIZED,
      (chrome as any).os.diagnostics.onRoutineInitialized,
    ],
    [
      RoutineV2EventCategory.RUNNING,
      (chrome as any).os.diagnostics.onRoutineRunning,
    ],
    [
      RoutineV2EventCategory.WAITING,
      (chrome as any).os.diagnostics.onRoutineWaiting,
    ],
    [
      RoutineV2EventCategory.FINISHED,
      (chrome as any).os.diagnostics.onRoutineFinished,
    ],
    [
      RoutineV2EventCategory.EXCEPTION,
      (chrome as any).os.diagnostics.onRoutineException,
    ],
  ]);

  private notifyPort(
    eventCategory: RoutineV2EventCategory,
    event: RoutineV2EventUnion,
  ) {
    const port = this.getPort();
    if (!port) {
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
    port.postMessage(routineV2Event);
    return;
  }

  public registerRoutineV2EventHandlers(): void {
    try {
      for (const [eventCategory, routineEventListener] of this
        .routineEventListeners) {
        routineEventListener.addListener(
          this.notifyPort.bind(this, eventCategory),
        );
      }
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  public isRoutineArgumentSupported(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<RoutineSupportStatusInfo> {
    return (chrome as any).os.diagnostics.isRoutineArgumentSupported(
      routineArgument,
    );
  }

  public async createRoutine(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<CreateRoutineResponse> {
    return (chrome as any).os.diagnostics.createRoutine(routineArgument);
  }

  public async startRoutine(
    startRoutineRequest: StartRoutineRequest,
  ): Promise<void> {
    return (chrome as any).os.diagnostics.startRoutine(startRoutineRequest);
  }

  public async cancelRoutine(
    cancelRoutineRequest: CancelRoutineRequest,
  ): Promise<void> {
    return (chrome as any).os.diagnostics.cancelRoutine(cancelRoutineRequest);
  }
}

/**
 * Fake implementation of RoutineV2Service
 * @extends RoutineV2Service
 */
export class FakeRoutineV2Service extends RoutineV2Service {
  public registerRoutineV2EventHandlers(): void {
    return fakeRoutineV2.registerEventHandlers();
  }

  public isRoutineArgumentSupported(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<RoutineSupportStatusInfo> {
    return fakeRoutineV2.isRoutineArgumentSupported(routineArgument);
  }

  public createRoutine(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<CreateRoutineResponse> {
    return fakeRoutineV2.createRoutine(routineArgument);
  }

  public startRoutine(startRoutineRequest: StartRoutineRequest): Promise<void> {
    return fakeRoutineV2.startRoutine(startRoutineRequest);
  }

  public cancelRoutine(
    cancelRoutineRequest: CancelRoutineRequest,
  ): Promise<void> {
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
