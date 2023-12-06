// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for fetching telemetry data from Chrome extension.
 */

import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {TelemetryInfoUnion} from 'common/message';
import {
  Request,
  Response,
  RequestType,
  TelemetryInfoType,
} from 'common/message';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private extensionId!: string;

  private constructTelemetryRequest: (infoType: TelemetryInfoType) => Request =
    (infoType) => {
      return {type: RequestType.TELEMETRY, telemetry: {infoType}};
    };

  public fetchTelemetryData: (
    infoType: TelemetryInfoType,
  ) => Promise<TelemetryInfoUnion> | undefined = (category) => {
    return new Promise((resolve, reject) => {
      const request = this.constructTelemetryRequest(category);
      try {
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              reject(response.error);
            } else if (!response.telemetry) {
              throw 'Invalid response';
            } else {
              resolve(response.telemetry.info);
            }
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  constructor() {
    this.extensionId = environment.extensionId;
  }
}
