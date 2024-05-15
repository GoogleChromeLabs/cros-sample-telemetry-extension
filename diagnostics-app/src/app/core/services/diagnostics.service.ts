/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

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
import {RoutineType} from 'common/telemetry-extension-types/legacy-diagnostics';
import {environment} from 'environments/environment';
import {LoggingService} from './logging.service';

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

  public constructor(private loggingService: LoggingService) {
    this.extensionId = environment.extensionId;
  }

  private constructDiagnosticsRequest(payload: DiagnosticsRequest): Request {
    return {type: RequestType.DIAGNOSTICS, diagnostics: payload};
  }

  private sendRequest(request: Request): Promise<DiagnosticsResponse> {
    return new Promise((resolve, reject) => {
      window.chrome.runtime.sendMessage(
        this.extensionId,
        request,
        (response: Response) => {
          if (!response.success) {
            this.loggingService.error(
              'Failed to send diagnostics request: ',
              response.error,
            );
            return reject(response.error);
          }

          if (!response.diagnostics) {
            this.loggingService.error(
              'Response does not contain diagnostics field: ',
              response,
            );
            return reject('Response does not contain diagnostics field');
          }

          return resolve(response.diagnostics);
        },
      );
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
