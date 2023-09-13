// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for running and managing diagnostics
 * routines from Chrome extension.
 */

import { Injectable } from '@angular/core';
import { DiagnosticsParams, RoutineType } from '@common/dpsl';
import {
  DiagnosticsRequest,
  RequestType,
  Request,
  Response,
  DiagnosticsAction,
  DiagnosticsResponse,
} from '@common/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  private extensionId!: string;

  private _constructDiagnosticsRequest: (
    payload: DiagnosticsRequest
  ) => Request = (payload) => {
    return { type: RequestType.DIAGNOSTICS, diagnostics: payload };
  };

  private _sendRequest: (request: Request) => Promise<DiagnosticsResponse> = (
    request: Request
  ) => {
    return new Promise((resolve, reject) => {
      try {
        //@ts-ignore
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              reject(response.error);
            } else if (!response.diagnostics) {
              throw 'Invalid response';
            } else {
              resolve(response.diagnostics);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  public runDiagnosticsRoutine: (
    routineName: RoutineType,
    params?: DiagnosticsParams
  ) => Promise<DiagnosticsResponse> = (routineName, params) => {
    const payload: DiagnosticsRequest = {
      action: DiagnosticsAction.START,
      routineName,
      params,
    };
    const request = this._constructDiagnosticsRequest(payload);
    return this._sendRequest(request);
  };

  public manageDiagnosticsRoutine: (
    routineId: number,
    action: DiagnosticsAction,
  ) => Promise<DiagnosticsResponse> = (routineId, action) => {
    const payload: DiagnosticsRequest = {
      routineId,
      action,
    };
    const request = this._constructDiagnosticsRequest(payload);
    return this._sendRequest(request);
  };

  constructor() {
    this.extensionId = environment.extensionId;
  }
}
