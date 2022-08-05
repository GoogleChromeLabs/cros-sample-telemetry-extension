// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle event requests
 */

import { Request, Response } from '@common/message';
import { generateErrorResponse } from '../utils';

type EventsController = (
  category: Request,
  res: (data: Response) => void
) => void;

export const handleEvents: EventsController = (req, res) => {
  res(generateErrorResponse('Events not implemented.'));
};
