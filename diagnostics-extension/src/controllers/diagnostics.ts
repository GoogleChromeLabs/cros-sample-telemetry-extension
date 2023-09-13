// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle diagnostics requests
 */

import {
  DiagnosticsParams,
  RoutineStatus,
  RoutineType,
  RunRoutineResponse,
} from '@common/dpsl';
import {
  DiagnosticsAction,
  DiagnosticsResponse,
  Request,
  Response,
  ResponseErrorInfoMessage,
} from '@common/message';
import { DiagnosticsServiceProvider } from '../services/diagnostics';
import {
  generateDiagnosticsSuccessResponse,
  generateErrorResponse,
} from '../utils';

type DiagnosticsController = (
  category: Request,
  res: (data: Response) => void
) => void;

const diagnosticsService = DiagnosticsServiceProvider.getDiagnosticsService();

const getAvailableRoutines = async () => {
  return diagnosticsService.getAvailableRoutines();
}

const handleStartRoutine = async (
  routineName: RoutineType | undefined,
  res: (data: Response) => void,
  params?: DiagnosticsParams
) => {
  if (!routineName) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName
      )
    );
  }
  try {
    const response: RunRoutineResponse = await diagnosticsService.startRoutine(routineName, params);
    if (response.status === RoutineStatus.ready               ||
        response.status === RoutineStatus.running             ||
        response.status === RoutineStatus.waiting_user_action ||
        response.status === RoutineStatus.passed) {
      return handleRoutineOperation(
        response.id,
        DiagnosticsAction.STATUS,
        res
      );
    } else {
      return res(generateErrorResponse(ResponseErrorInfoMessage.InvalidDiagnosticsRoutineStatus));
    }
  } catch (err) {
    return res(generateErrorResponse(String(err)))
  }
};

const handleRoutineOperation = async (
  id: number | undefined,
  command: DiagnosticsAction,
  res: (data: Response) => void
) => {
  if (!id) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId
      )
    );
  }
  try {
    let info;
    switch (command) {
      case DiagnosticsAction.STOP:
        info = await diagnosticsService.stopRoutine(id);
        break;
      case DiagnosticsAction.RESUME:
        info = await diagnosticsService.resumeRoutine(id);
        break;
      case DiagnosticsAction.STATUS:
        info = await diagnosticsService.getRoutineStatus(id);
        break;
    }
    const payload: DiagnosticsResponse = { id, info };
    return res(generateDiagnosticsSuccessResponse(payload));
  } catch (err) {
    return res(generateErrorResponse(String(err)))
  }
};

export const handleDiagnostics: DiagnosticsController = (req, res) => {
  if (!req.diagnostics)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingDiagnosticsRequest)
    );

  switch (req.diagnostics.action) {
    case DiagnosticsAction.START:
      if (req.diagnostics.routineName === RoutineType.available_routines) {
        return getAvailableRoutines();
      } else {
        return handleStartRoutine(
          req.diagnostics.routineName,
          res,
          req.diagnostics.params
      )};
    case DiagnosticsAction.STATUS:
    case DiagnosticsAction.STOP:
    case DiagnosticsAction.RESUME:
      return handleRoutineOperation(
        req.diagnostics.routineId,
        req.diagnostics.action,
        res
      );
    default:
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.InvalidDiagnosticsAction)
    );
  }
};
