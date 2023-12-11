// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle routine v2 requests
 */

import {
  Request,
  Response,
  ResponseErrorInfoMessage,
  RoutineV2Action,
  RoutineV2Response,
} from '../common/message';
import {RoutineV2ServiceProvider} from '../services/routine-v2.service';
import {
  generateErrorResponse,
  generateRoutineV2SuccessResponse,
} from '../utils';

type RoutineV2Controller = (
  req: Request,
  res: (data: Response) => void,
) => void;

const routineV2Service = RoutineV2ServiceProvider.getRoutineV2Service();

export const registerRoutineV2EventHandlers: () => void = () => {
  routineV2Service.registerRoutineV2EventHandlers();
};

export const onRoutineV2PortConnect = async (port: chrome.runtime.Port) => {
  routineV2Service.registerPort(port);
};

export const handleRoutineV2: RoutineV2Controller = async (
  req: Request,
  res: (data: Response) => void,
) => {
  if (!req.routineV2)
    return res(generateErrorResponse('Missing routine v2 object in request.'));

  try {
    let routineV2Response: RoutineV2Response;
    switch (req.routineV2.type) {
      case RoutineV2Action.CREATE_ROUTINE:
        routineV2Response = await routineV2Service.createRoutine(
          req.routineV2.request,
        );
        return res(generateRoutineV2SuccessResponse(routineV2Response));
      case RoutineV2Action.IS_ROUTINE_ARGUMENT_SUPPORTED:
        routineV2Response = await routineV2Service.isRoutineArgumentSupported(
          req.routineV2.request,
        );
        return res(generateRoutineV2SuccessResponse(routineV2Response));
      case RoutineV2Action.START_ROUTINE:
        await routineV2Service.startRoutine(req.routineV2.request);
        return res(generateRoutineV2SuccessResponse());
      case RoutineV2Action.CANCEL_ROUTINE:
        await routineV2Service.cancelRoutine(req.routineV2.request);
        return res(generateRoutineV2SuccessResponse());
      default:
        return res(
          generateErrorResponse(ResponseErrorInfoMessage.InvalidEventsAction),
        );
    }
  } catch (err) {
    res(generateErrorResponse(String(err)));
  }
};
