// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for running and managing diagnostics
 * routines from Chrome extension.
 */

import {Injectable} from '@angular/core';
import {
  DiagnosticsAction,
  DiagnosticsParamsUnion,
  DiagnosticsRequest,
  DiagnosticsResponse,
  Request,
  RequestType,
  Response,
} from 'common/message';
import {RoutineType} from 'common/telemetry-extension-types';
import {environment} from 'environments/environment';

export interface DiagnosticsInterface {
  startRoutine(
    routineName: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<DiagnosticsResponse>;
  stopRoutine(id: number): Promise<DiagnosticsResponse>;
  resumeRoutine(id: number): Promise<DiagnosticsResponse>;
  getRoutineStatus(id: number): Promise<DiagnosticsResponse>;
  getAvailableRoutines(): Promise<DiagnosticsResponse>;
}

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService implements DiagnosticsInterface {
  private extensionId!: string;

  private constructDiagnosticsRequest(payload: DiagnosticsRequest): Request {
    return {type: RequestType.DIAGNOSTICS, diagnostics: payload};
  }

  private sendRequest(request: Request): Promise<DiagnosticsResponse> {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              return reject(response.error);
            } else if (!response.diagnostics) {
              throw 'Invalid response';
            } else {
              return resolve(response.diagnostics);
            }
          },
        );
      } catch (err) {
        return reject(err);
      }
    });
  }

  private manageDiagnosticsRoutine(
    action: DiagnosticsAction,
    routineId: number,
  ): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action,
      routineId,
    };
    const request = this.constructDiagnosticsRequest(payload);
    return this.sendRequest(request);
  }

  public constructor() {
    this.extensionId = environment.extensionId;
  }

  public startRoutine(
    routineName: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action: DiagnosticsAction.START,
      routineName,
      params,
    };
    const request = this.constructDiagnosticsRequest(payload);
    return this.sendRequest(request);
  }

  public stopRoutine(id: number): Promise<DiagnosticsResponse> {
    return this.manageDiagnosticsRoutine(DiagnosticsAction.STOP, id);
  }

  public resumeRoutine(id: number): Promise<DiagnosticsResponse> {
    return this.manageDiagnosticsRoutine(DiagnosticsAction.RESUME, id);
  }

  public getRoutineStatus(id: number): Promise<DiagnosticsResponse> {
    return this.manageDiagnosticsRoutine(DiagnosticsAction.STATUS, id);
  }

  public getAvailableRoutines(): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action: DiagnosticsAction.GET_AVAILABLE_ROUTINE,
    };
    const request = this.constructDiagnosticsRequest(payload);
    return this.sendRequest(request);
  }
}
