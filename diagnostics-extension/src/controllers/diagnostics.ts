// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle diagnostics requests
 */

import { DiagnosticsParams, RoutineStatus } from '@common/dpsl';
import {
  DiagnosticsAction,
  DiagnosticsResponse,
  DiagnosticsRoutineName,
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

const handleStartRoutine = async (
  routineName: DiagnosticsRoutineName | undefined,
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
  const routineId = await diagnosticsService.runRoutine(routineName, params);
  return handleRoutineOperation(
    routineId,
    routineOperationMap[DiagnosticsAction.STATUS],
    res
  );
};

const routineOperationMap = {
  [DiagnosticsAction.STATUS]: diagnosticsService.getRoutineStatus,
  [DiagnosticsAction.RESUME]: diagnosticsService.resumeRoutine,
  [DiagnosticsAction.STOP]: diagnosticsService.stopRoutine,
};

const handleRoutineOperation = async (
  routineId: number | undefined,
  routineOperation: (id: number) => Promise<RoutineStatus>,
  res: (data: Response) => void
) => {
  if (!routineId) {
    return res(
      generateErrorResponse(
        ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId
      )
    );
  }
  const routineStatus = await routineOperation(routineId);
  const payload: DiagnosticsResponse = { routineId, routineStatus };
  return res(generateDiagnosticsSuccessResponse(payload));
};

export const handleDiagnostics: DiagnosticsController = (req, res) => {
  if (!req.diagnostics)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingDiagnosticsRequest)
    );

  switch (req.diagnostics.action) {
    case DiagnosticsAction.START:
      return handleStartRoutine(
        req.diagnostics.routineName,
        res,
        req.diagnostics.params
      );
    case DiagnosticsAction.STATUS:
    case DiagnosticsAction.RESUME:
    case DiagnosticsAction.STOP:
      return handleRoutineOperation(
        req.diagnostics.routineId,
        routineOperationMap[req.diagnostics.action],
        res
      );
    default:
      return res(
        generateErrorResponse(ResponseErrorInfoMessage.InvalidDiagnosticsAction)
      );
  }
};
