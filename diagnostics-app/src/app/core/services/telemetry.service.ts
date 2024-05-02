/**
 * @fileoverview Service for fetching telemetry data from Chrome extension.
 */

import {Injectable} from '@angular/core';
import {
  Request,
  RequestType,
  Response,
  TelemetryInfoType,
  TelemetryInfoUnion,
} from 'common/message';
import {environment} from 'environments/environment';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private extensionId!: string;

  constructor(private loggingService: LoggingService) {
    this.extensionId = environment.extensionId;
  }

  private constructTelemetryRequest(infoType: TelemetryInfoType): Request {
    return {type: RequestType.TELEMETRY, telemetry: {infoType}};
  }

  public fetchTelemetryData(
    infoType: TelemetryInfoType,
  ): Promise<TelemetryInfoUnion> {
    return new Promise((resolve, reject) => {
      const request = this.constructTelemetryRequest(infoType);
      window.chrome.runtime.sendMessage(
        this.extensionId,
        request,
        (response: Response) => {
          if (!response.success) {
            this.loggingService.error(
              'Failed to send telemetry request: ',
              response.error,
            );
            return reject(response.error);
          }

          if (!response.telemetry) {
            this.loggingService.error(
              'Response does not contain telemetry field: ',
              response,
            );
            return reject('Response does not contain telemetry field');
          }

          return resolve(response.telemetry.info);
        },
      );
    });
  }
}
