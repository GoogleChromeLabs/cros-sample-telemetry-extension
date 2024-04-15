// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for starting to capture events and stopping
 * capturing events from Chrome extension.
 */

import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

import {VISIBLE_ROUTINE_V2_CARDS} from 'common/config/support-assist';
import {
  CancelRoutineMessage,
  CreateRoutineMessage,
  IsCreateRoutineResponse,
  IsRoutineArgumentSupportedMessage,
  IsRoutineSupportStatusInfo,
  PortName,
  Request,
  RequestType,
  Response,
  ResponseErrorInfoMessage,
  RoutineV2Action,
  RoutineV2Event,
  RoutineV2Request,
  RoutineV2Response,
  StartRoutineMessage,
} from 'common/message';
import {
  CreateRoutineArgumentsUnion,
  CreateRoutineResponse,
  RoutineSupportStatus,
  RoutineSupportStatusInfo,
} from 'common/telemetry-extension-types/routines';
import {validateUnion} from 'common/util';
import {environment} from 'environments/environment';
import {LoggingService} from './logging.service';

export interface GetSubjectResponse {
  success: Boolean;
  subject?: Subject<RoutineV2Event>;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoutineV2Service {
  // the ID of the extension service connects to.
  private extensionId: string = environment.extensionId;
  // A map storing subjects to forward the runtime responses from running
  // routine V2 to.
  private subjects = new Map<
    CreateRoutineArgumentsUnion,
    Subject<RoutineV2Event>
  >();
  // The port for connecting with the extension to receive runtime responses.
  private port?: chrome.runtime.Port;
  // Since we use routine argument as the source of truth for each routine type,
  // we store a map which maps between the uuid and its corresponding routine
  // argument.
  private uuidToRoutineArgument = new Map<
    string,
    CreateRoutineArgumentsUnion
  >();
  // A cache to preload the supported routines.
  private supportabilityCache = new Map<
    CreateRoutineArgumentsUnion,
    Promise<RoutineSupportStatusInfo>
  >();

  constructor(
    private ngZone: NgZone,
    private loggingService: LoggingService,
  ) {}

  private constructRoutineV2Request(payload: RoutineV2Request): Request {
    return {type: RequestType.ROUTINE_V2, routineV2: payload};
  }

  private sendRequest(request: Request): Promise<RoutineV2Response> {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              return reject(response.error);
            }
            return resolve(response?.routineV2 ?? null);
          },
        );
      } catch (err) {
        return reject(err);
      }
    });
  }

  public Init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.port = window.chrome.runtime.connect(this.extensionId, {
          name: PortName.ROUTINE_V2_PORT,
        });
        this.port.onMessage.addListener((msg: RoutineV2Event) => {
          // Port messages are asynchronous and inherently outside of angular
          // detection zone. Wrap listener in `ngZone.run()` to ensure all
          // components are updated.
          this.ngZone.run(() => {
            if (!('uuid' in msg.event)) {
              this.loggingService.error('Missing UUID in message: ', msg);
              return;
            }

            if (!this.uuidToRoutineArgument.has(msg.event.uuid!)) {
              this.loggingService.error(
                'Error finding routine argument from uuid: ',
                msg.event.uuid,
              );
              return;
            }

            const routineArg: CreateRoutineArgumentsUnion =
              this.uuidToRoutineArgument.get(msg.event.uuid!)!;
            if (this.subjects.has(routineArg)) {
              this.subjects.get(routineArg)!.next(msg);
              return;
            }
            this.loggingService.error(
              'Error finding subject from UUID: ',
              msg.event.uuid,
            );
          });
        });
        for (const argument of VISIBLE_ROUTINE_V2_CARDS) {
          this.isRoutineArgumentSupported(argument);
        }
        return resolve();
      } catch (err) {
        this.loggingService.error(
          ResponseErrorInfoMessage.FAILED_PORT_CONNECTION_SERVICE_CONSTRUCTOR,
        );
        return reject();
      }
    });
  }

  private sendIsRoutineArgumentSupportedRequest(
    routineArg: CreateRoutineArgumentsUnion,
  ): Promise<RoutineSupportStatusInfo> {
    const routineV2Request: IsRoutineArgumentSupportedMessage = {
      type: RoutineV2Action.IS_ROUTINE_ARGUMENT_SUPPORTED,
      request: routineArg,
    };
    const payload: Request = this.constructRoutineV2Request(routineV2Request);
    return new Promise((resolve, reject) => {
      this.sendRequest(payload)
        .then((response: RoutineV2Response) => {
          if (IsRoutineSupportStatusInfo(response)) {
            resolve(response as RoutineSupportStatusInfo);
          }
          return reject('invalid response type');
        })
        .catch((error) => reject(error));
    });
  }

  public isRoutineArgumentSupported(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<RoutineSupportStatusInfo> {
    if (validateUnion(routineArgument) === null) {
      this.loggingService.error('Invalid routine argument: ', routineArgument);
      return Promise.reject('invalid routine argument');
    }
    if (!this.supportabilityCache.has(routineArgument)) {
      const promise =
        this.sendIsRoutineArgumentSupportedRequest(routineArgument);
      this.supportabilityCache.set(routineArgument, promise);
    }
    return this.supportabilityCache.get(routineArgument)!;
  }

  public async getSubject(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<GetSubjectResponse> {
    if (!this.isRoutineArgumentSupported(routineArgument)) {
      this.loggingService.error(
        'A getSubject request is called on unsupported routine argument: ',
        routineArgument,
      );
      return Promise.reject({
        success: false,
        error: 'Unsupported routine argument',
      });
    }

    if (!this.subjects.has(routineArgument)) {
      try {
        const supportStatusInfo =
          await this.isRoutineArgumentSupported(routineArgument);
        if (supportStatusInfo.status === RoutineSupportStatus.supported) {
          this.subjects.set(routineArgument, new Subject<RoutineV2Event>());
        }
      } catch (err) {
        return {success: false, error: String(err)};
      }
    }
    return {success: true, subject: this.subjects.get(routineArgument)!};
  }

  private sendCreateRoutineRequest(
    routineArg: CreateRoutineArgumentsUnion,
  ): Promise<CreateRoutineResponse> {
    const routineV2Request: CreateRoutineMessage = {
      type: RoutineV2Action.CREATE_ROUTINE,
      request: routineArg,
    };
    const payload: Request = this.constructRoutineV2Request(routineV2Request);
    return new Promise((resolve, reject) => {
      this.sendRequest(payload)
        .then((response: RoutineV2Response) => {
          if (IsCreateRoutineResponse(response)) {
            return resolve(response as CreateRoutineResponse);
          }
          return reject('invalid response type');
        })
        .catch((error) => reject(error));
    });
  }

  public CreateRoutine(
    routineArgument: CreateRoutineArgumentsUnion,
  ): Promise<CreateRoutineResponse> {
    if (validateUnion(routineArgument) === null) {
      this.loggingService.error('Invalid routine argument: ', routineArgument);
      return Promise.reject('invalid routine argument');
    }
    const promise = this.sendCreateRoutineRequest(routineArgument);
    promise.then((response: CreateRoutineResponse) => {
      if (response.uuid !== undefined)
        this.uuidToRoutineArgument.set(response.uuid, routineArgument);
    });
    return promise;
  }

  public StartRoutine(uuid: string): void {
    const routineV2Request: StartRoutineMessage = {
      type: RoutineV2Action.START_ROUTINE,
      request: {uuid: uuid},
    };
    const payload: Request = this.constructRoutineV2Request(routineV2Request);
    this.sendRequest(payload);
  }

  public CancelRoutine(uuid: string): void {
    const routineV2Request: CancelRoutineMessage = {
      type: RoutineV2Action.CANCEL_ROUTINE,
      request: {uuid: uuid},
    };
    const payload: Request = this.constructRoutineV2Request(routineV2Request);
    this.sendRequest(payload);
  }
}
