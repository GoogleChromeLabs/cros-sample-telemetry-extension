// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card component for routine v2.
 * Imported by routine-v2.module.ts
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';

import {originalOrder} from 'app/core/app-utils';
import {RoutineV2Service} from 'app/core/services/routine-v2.service';
import {RoutineV2Event, RoutineV2EventCategory} from 'common/message';
import {
  CreateRoutineArgumentsUnion,
  ExceptionInfo,
  RoutineFinishedInfo,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineWaitingInfo,
} from 'common/telemetry-extension-types/routines';
import {validateUnion} from 'common/util';
import {Subscription} from 'rxjs';

enum RoutineV2State {
  // Either finished or haven't been ran yet.
  FINISHED = 'finished',
  INITIALIZED = 'initialized',
  RUNNING = 'running',
  WAITING = 'waiting',
  EXCEPTION = 'exception',
  CANCELLED = 'cancelled',
}

@Component({
  selector: 'app-routine-v2-card',
  templateUrl: './routine-v2-card.component.html',
  styleUrls: ['./routine-v2-card.component.css'],
})
export class RoutineV2CardComponent implements OnInit, OnDestroy {
  @Input({required: true}) routineArgument!: CreateRoutineArgumentsUnion;

  public RoutineV2State = RoutineV2State;

  // The output, which may be either routine result or user action.
  public output?: object | string;
  // Whether the routine has passed. Only shown if the routine is finished.
  public hasPassed?: boolean;
  // The error message, undefined if no error occurs.
  public error?: string;
  // An integer between 0 ~ 100 detailing the percentage ran of the routine.
  public percentage = 0;
  // The state of the underlying routine.
  public routineState: RoutineV2State = RoutineV2State.FINISHED;
  // The routine id associated with the card, possibly null if no routine is running.
  private uuid?: string;
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

  // Used in HTML template.
  public originalOrder = originalOrder;

  get passedColor() {
    if (this.hasPassed) {
      return 'green';
    }
    return 'red';
  }
  get messageColor() {
    if (
      this.routineState === RoutineV2State.EXCEPTION ||
      this.routineState === RoutineV2State.CANCELLED
    ) {
      return 'yellow';
    }
    return 'white';
  }
  get routineCategory() {
    return validateUnion(this.routineArgument);
  }
  public constructor(
    private routineV2Service: RoutineV2Service,
    private loggingService: LoggingService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.routineV2Service.getSubject(this.routineArgument);
      if (!res.success) {
        this.loggingService.error(
          'Failed to get routine v2 subject: ',
          res.error,
        );
        this.error = res.error;
        return;
      }

      if (!res.subject) {
        this.loggingService.error('Unexpected routine v2 subject: ', res);
        this.error = 'Unexpected routine v2 subject';
        return;
      }

      this.subscriptions.push(
        res.subject.subscribe({
          next: (event: RoutineV2Event) => {
            this.handleEventResponse(event);
          },
        }),
      );
    } catch (err) {
      this.loggingService.error('Failed to get routine v2 subject: ', err);
      this.error = (err as Error).message;
    }
  }

  ngOnDestroy(): void {
    if (this.uuid) {
      this.routineV2Service.CancelRoutine(this.uuid);
    }
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // Checks whether the UUID received is the same as the UUID of the running
  // routine.
  // TODO(b/317946517): Add UI/UX for error handling when UUID is not matched.
  private _checkUUID(uuid: string | undefined): boolean {
    if (this.uuid !== uuid) {
      this.loggingService.error('UUID not matched');
      this.error = 'ERROR: uuid not matched';
      return false;
    }
    return true;
  }
  private async handleEventResponse(event: RoutineV2Event) {
    switch (event.eventCategory) {
      case RoutineV2EventCategory.INITIALIZED: {
        this.output = 'initialized';
        this.routineState = RoutineV2State.RUNNING;
        const routineInitializedInfo = event.event as RoutineInitializedInfo;
        if (!this._checkUUID(routineInitializedInfo.uuid)) {
          break;
        }
        break;
      }
      case RoutineV2EventCategory.RUNNING: {
        this.output = 'running...';
        this.routineState = RoutineV2State.RUNNING;
        const routineRunningInfo = event.event as RoutineRunningInfo;
        if (!this._checkUUID(routineRunningInfo.uuid)) {
          break;
        }
        if (routineRunningInfo.percentage) {
          this.percentage = routineRunningInfo.percentage;
        }
        break;
      }
      case RoutineV2EventCategory.WAITING: {
        this.routineState = RoutineV2State.WAITING;
        const routineWaitingInfo = event.event as RoutineWaitingInfo;
        if (!this._checkUUID(routineWaitingInfo.uuid)) {
          break;
        }
        if (routineWaitingInfo.percentage) {
          this.percentage = routineWaitingInfo.percentage;
        }
        this.output = 'Waiting: ' + routineWaitingInfo.message;
        break;
      }
      case RoutineV2EventCategory.EXCEPTION: {
        this.routineState = RoutineV2State.EXCEPTION;
        const routineExceptionInfo = event.event as ExceptionInfo;
        if (!this._checkUUID(routineExceptionInfo.uuid)) {
          break;
        }
        this.percentage = 0;
        this.output = 'Exception: ' + routineExceptionInfo.debugMessage;
        break;
      }
      case RoutineV2EventCategory.FINISHED: {
        this.routineState = RoutineV2State.FINISHED;
        const routineFinishedInfo = event.event as RoutineFinishedInfo;
        if (!this._checkUUID(routineFinishedInfo.uuid)) {
          break;
        }
        this.percentage = 100;
        this.hasPassed = routineFinishedInfo.hasPassed;
        this.uuid = undefined;
        this.output = routineFinishedInfo.detail;
        break;
      }
    }
  }

  public async createAndStartRoutine() {
    try {
      const createRoutineResponse = await this.routineV2Service.CreateRoutine(
        this.routineArgument,
      );
      this.uuid = createRoutineResponse.uuid;
      this.routineState = RoutineV2State.INITIALIZED;
      this.output = undefined;
      this.hasPassed = undefined;
      if (this.uuid === undefined) {
        throw new TypeError('Create routine error');
      }
      await this.routineV2Service.StartRoutine(this.uuid);
      this.percentage = 0;
    } catch (err) {
      this.loggingService.error(
        'Failed to get create and start V2 routine: ',
        err,
      );
      this.error = String(err);
    }
  }

  public async cancelRoutine() {
    if (!this.uuid) {
      return;
    }

    try {
      this.routineState = RoutineV2State.CANCELLED;
      const uuid = this.uuid;
      this.uuid = undefined;
      await this.routineV2Service.CancelRoutine(uuid);
      this.output = 'routine cancelled';
      this.percentage = 0;
    } catch (err) {
      this.loggingService.error('Failed to get cancel V2 routine: ', err);
      this.error = String(err);
    }
  }
}
