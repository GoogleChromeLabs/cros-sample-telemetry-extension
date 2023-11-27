// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake events data.
 */

import {EventCategory, EventSupportStatusInfo} from '@common/dpsl';
import {Response} from '@common/message';

export const registerEventHandlers = async (): Promise<Response> => {
  return {success: true};
};
export const registerPort = (port: chrome.runtime.Port): void => {
  return;
};
export const isEventSupported = async (
  eventType: EventCategory,
): Promise<EventSupportStatusInfo> => {
  let res: EventSupportStatusInfo = {};
  return res;
};
export const startCapturingEvents = async (
  eventType: EventCategory,
): Promise<void> => {
  return;
};
export const stopCapturingEvents = async (
  eventType: EventCategory,
): Promise<void> => {
  return;
};
