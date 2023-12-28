// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card component for routine v2.
 * Imported by routine-v2.module.ts
 */

import {KeyValue} from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {RoutineV2Service} from 'app/core/services/routine-v2.service';
import {
  RoutineV2Argument,
  RoutineV2Event,
  RoutineV2EventCategory,
  RoutineV2FinishedInfoUnion,
} from 'common/message';
import {
  ExceptionInfo,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineWaitingInfo,
} from 'common/telemetry-extension-types';

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
  @Input({required: true}) routineArgument!: RoutineV2Argument;

  public RoutineV2State = RoutineV2State;

  private _routineOutput?: RoutineV2FinishedInfoUnion;
  // The output, which may be either routine result or user action.
  private _output?: object | string;
  // Whether the routine has passed. Only shown if the routine is finished.
  private _hasPassed?: boolean;
  // The error message if any.
  private _error?: string;
  // The routine id associated with the card, possibly null if no routine is running.
  private _uuid?: string;
  // An integer between 0 ~ 100 detailing the percentage ran of the routine.
  private _percentage = 0;
  // The state of the underlying routine.
  private _routineState: RoutineV2State = RoutineV2State.FINISHED;

  get error() {
    return this._error;
  }
  get output() {
    return this._output;
  }
  get percentage() {
    return this._percentage;
  }
  get routineState() {
    return this._routineState;
  }
  get hasPassed() {
    return this._hasPassed;
  }
  get passedColor() {
    if (this._hasPassed) {
      return 'green';
    }
    return 'red';
  }
  get messageColor() {
    if (
      this._routineState === RoutineV2State.EXCEPTION ||
      this._routineState === RoutineV2State.CANCELLED
    ) {
      return 'yellow';
    }
    return 'white';
  }

  public constructor(
    private routineV2Service: RoutineV2Service,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.routineV2Service
      .getSubject(this.routineArgument)
      .then((res) => {
        if (res.success && res.subject) {
          res.subject.subscribe({
            next: (event: RoutineV2Event) => {
              this.handleEventResponse(event);
            },
          });
        } else {
          this._error = res.error;
        }
      })
      .catch((err) => {
        this._error = err.message;
      });
  }

  ngOnDestroy(): void {
    if (this._uuid) {
      this.routineV2Service.CancelRoutine(this._uuid);
    }
  }

  // This function is used for maintaining the attributes' original order.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public originalOrder(
    _a: KeyValue<number, string>,
    _b: KeyValue<number, string>,
  ): number {
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // Checks whether the UUID received is the same as the UUID of the running
  // routine.
  // TODO(b/317946517): Add UI/UX for error handling when UUID is not matched.
  private _checkUUID(uuid: string | undefined): boolean {
    if (this._uuid !== uuid) {
      console.error('UUID not matched');
      this._error = 'ERROR: uuid not matched';
      return false;
    }
    return true;
  }
  private async handleEventResponse(event: RoutineV2Event) {
    switch (event.eventCategory) {
      case RoutineV2EventCategory.initialized: {
        this._output = 'initialized';
        this._routineOutput = undefined;
        this._routineState = RoutineV2State.RUNNING;
        const routineInitializedInfo = event.event as RoutineInitializedInfo;
        if (!this._checkUUID(routineInitializedInfo.uuid)) {
          break;
        }
        break;
      }
      case RoutineV2EventCategory.running: {
        this._output = 'running...';
        this._routineState = RoutineV2State.RUNNING;
        const routineRunningInfo = event.event as RoutineRunningInfo;
        if (!this._checkUUID(routineRunningInfo.uuid)) {
          break;
        }
        if (routineRunningInfo.percentage) {
          this._percentage = routineRunningInfo.percentage;
        }
        break;
      }
      case RoutineV2EventCategory.waiting: {
        this._routineState = RoutineV2State.WAITING;
        const routineWaitingInfo = event.event as RoutineWaitingInfo;
        if (!this._checkUUID(routineWaitingInfo.uuid)) {
          break;
        }
        if (routineWaitingInfo.percentage) {
          this._percentage = routineWaitingInfo.percentage;
        }
        this._output = 'Waiting: ' + routineWaitingInfo.message;
        break;
      }
      case RoutineV2EventCategory.exception: {
        this._routineState = RoutineV2State.EXCEPTION;
        const routineExceptionInfo = event.event as ExceptionInfo;
        if (!this._checkUUID(routineExceptionInfo.uuid)) {
          break;
        }
        this._percentage = 0;
        this._output = 'Exception: ' + routineExceptionInfo.debugMessage;
        break;
      }
      case RoutineV2EventCategory.fanFinished:
      case RoutineV2EventCategory.memoryFinished:
      case RoutineV2EventCategory.volumeButtonFinished: {
        this._routineState = RoutineV2State.FINISHED;
        const routineFinishedInfo = event.event as RoutineV2FinishedInfoUnion;
        if (!this._checkUUID(routineFinishedInfo.uuid)) {
          break;
        }
        this._percentage = 100;
        this._hasPassed = routineFinishedInfo.has_passed;
        delete routineFinishedInfo.uuid;
        delete routineFinishedInfo.has_passed;
        this._output = routineFinishedInfo;

        break;
      }
    }
    // Angular does not detect changes outside of its detection zone. Since
    // these updates are asynchronous via event notification from extension,
    // manually trigger change detection.
    this.changeDetectorRef.detectChanges();
  }

  public async createAndStartRoutine() {
    try {
      const createRoutineResponse = await this.routineV2Service.CreateRoutine(
        this.routineArgument,
      );
      this._uuid = createRoutineResponse.uuid;
      this._routineState = RoutineV2State.INITIALIZED;
      this._output = undefined;
      this._hasPassed = undefined;
      if (this._uuid === undefined) {
        throw new TypeError('Create routine error');
      }
      await this.routineV2Service.StartRoutine(this._uuid);
      this._percentage = 0;
    } catch (err) {
      console.log('an error was found: ', err);
      this._error = String(err);
    }
  }

  public async cancelRoutine() {
    if (!this._uuid) {
      return;
    }

    try {
      this._routineState = RoutineV2State.CANCELLED;
      const uuid = this._uuid;
      this._uuid = undefined;
      await this.routineV2Service.CancelRoutine(uuid);
      this._output = 'routine cancelled';
      this._percentage = 0;
    } catch (err) {
      this._error = String(err);
    }
  }
}
