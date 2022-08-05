// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/controllers/events
 */

import { handleEvents } from '../../controllers/events';
import { generateErrorResponse } from '../../utils';
import {
  Request,
  Response,
  RequestType,
} from '@common/message';

describe('should implement diagnostics controller', () => {
  it('should return not implemented response', () => {
    const req: Request = { type: RequestType.EVENTS };
    const res: (response: Response) => void = jest.fn();
    handleEvents(req, res);
    expect(res).toHaveBeenCalledWith(
      generateErrorResponse('Events not implemented.')
    );
  });
});
