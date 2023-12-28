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
    name: RoutineType,
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

  private _constructDiagnosticsRequest(payload: DiagnosticsRequest): Request {
    return {type: RequestType.DIAGNOSTICS, diagnostics: payload};
  }

  private _sendRequest(request: Request): Promise<DiagnosticsResponse> {
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

  private _getAvailableRoutines(): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action: DiagnosticsAction.GET_AVAILABLE_ROUTINE,
    };
    const request = this._constructDiagnosticsRequest(payload);
    return this._sendRequest(request);
  }

  private _runDiagnosticsRoutine(
    routineName: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action: DiagnosticsAction.START,
      routineName,
      params,
    };
    const request = this._constructDiagnosticsRequest(payload);
    return this._sendRequest(request);
  }

  private _manageDiagnosticsRoutine(
    action: DiagnosticsAction,
    routineId: number,
  ): Promise<DiagnosticsResponse> {
    const payload: DiagnosticsRequest = {
      action,
      routineId,
    };
    const request = this._constructDiagnosticsRequest(payload);
    return this._sendRequest(request);
  }

  public constructor() {
    this.extensionId = environment.extensionId;
  }

  public startRoutine(
    name: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<DiagnosticsResponse> {
    return this._runDiagnosticsRoutine(name, params);
  }

  public stopRoutine(id: number): Promise<DiagnosticsResponse> {
    return this._manageDiagnosticsRoutine(DiagnosticsAction.STOP, id);
  }

  public resumeRoutine(id: number): Promise<DiagnosticsResponse> {
    return this._manageDiagnosticsRoutine(DiagnosticsAction.RESUME, id);
  }

  public getRoutineStatus(id: number): Promise<DiagnosticsResponse> {
    return this._manageDiagnosticsRoutine(DiagnosticsAction.STATUS, id);
  }

  public getAvailableRoutines(): Promise<DiagnosticsResponse> {
    return this._getAvailableRoutines();
  }
}
