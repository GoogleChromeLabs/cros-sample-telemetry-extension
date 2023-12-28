// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle diagnostics requests
 */

import {
  DiagnosticsAction,
  DiagnosticsParamsUnion,
  DiagnosticsResponse,
  Request,
  Response,
  ResponseErrorInfoMessage,
} from '../common/message';
import {
  GetAvailableRoutinesResponse,
  RoutineStatus,
  RoutineType,
  RunRoutineResponse,
} from '../common/telemetry-extension-types';
import {DiagnosticsServiceProvider} from '../services/diagnostics.service';
import {
  generateDiagnosticsSuccessResponse,
  generateErrorResponse,
} from '../utils';

const diagnosticsService = DiagnosticsServiceProvider.getDiagnosticsService();

async function getAvailableRoutines(res: (data: Response) => void) {
  try {
    const payload: GetAvailableRoutinesResponse =
      await diagnosticsService.getAvailableRoutines();
    return res(generateDiagnosticsSuccessResponse(payload));
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

async function handleStartRoutine(
  routineName: RoutineType | undefined,
  res: (data: Response) => void,
  params?: DiagnosticsParamsUnion,
) {
  if (!routineName) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName,
      ),
    );
  }
  try {
    const response: RunRoutineResponse = await diagnosticsService.startRoutine(
      routineName,
      params,
    );
    if (
      response.status === RoutineStatus.ready ||
      response.status === RoutineStatus.running ||
      response.status === RoutineStatus.waiting_user_action ||
      response.status === RoutineStatus.passed
    ) {
      return handleRoutineOperation(response.id, DiagnosticsAction.STATUS, res);
    } else {
      return res(
        generateErrorResponse(
          ResponseErrorInfoMessage.InvalidDiagnosticsRoutineStatus,
        ),
      );
    }
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

async function handleRoutineOperation(
  id: number | undefined,
  command: DiagnosticsAction,
  res: (data: Response) => void,
) {
  if (!id) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId,
      ),
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
    const payload: DiagnosticsResponse = {id, info};
    return res(generateDiagnosticsSuccessResponse(payload));
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

export async function handleDiagnostics(
  req: Request,
  res: (data: Response) => void,
): Promise<void> {
  if (!req.diagnostics)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingDiagnosticsRequest),
    );

  switch (req.diagnostics.action) {
    case DiagnosticsAction.GET_AVAILABLE_ROUTINE:
      return getAvailableRoutines(res);
    case DiagnosticsAction.START:
      return handleStartRoutine(
        req.diagnostics.routineName,
        res,
        req.diagnostics.params,
      );
    case DiagnosticsAction.STATUS:
    case DiagnosticsAction.STOP:
    case DiagnosticsAction.RESUME:
      return handleRoutineOperation(
        req.diagnostics.routineId,
        req.diagnostics.action,
        res,
      );
    default:
      return res(
        generateErrorResponse(
          ResponseErrorInfoMessage.InvalidDiagnosticsAction,
        ),
      );
  }
}
