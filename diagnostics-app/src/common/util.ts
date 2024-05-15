/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {
  CreateRoutineArgumentsUnion,
  RoutineFinishedDetailUnion,
} from './telemetry-extension-types/routines';

// validateUnion should receive a dictionary union type object. It will validate
// whether only one field is set for this union. If the union is invalid, return
// null. Otherwise, return the name of the single valid key.
/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateUnion(
  dict: CreateRoutineArgumentsUnion | RoutineFinishedDetailUnion,
): string | null {
  // The number of non-null fields in the object.
  const fieldCount = Object.values(dict).filter(
    (value) => value !== undefined,
  ).length;

  // A dictionary union should have one and only one field.
  if (fieldCount !== 1) {
    return null;
  }

  // Find and return the key that has an associated value.
  const setField: string | null =
    Object.keys(dict).find((key) => (dict as any)[key] !== undefined) ?? null;
  return setField;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
