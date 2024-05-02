/**
 * @fileoverview Defines helper functions that is shared across the angular app
 * directory.
 */

import {KeyValue} from '@angular/common';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// originalOrder maintains an object attributes' original order during
// iteration.
export function originalOrder(
  _a: KeyValue<number, string>,
  _b: KeyValue<number, string>,
): number {
  return 0;
}

// isPrimitiveType returns true if the input is not a primitive type.
export function isPrimitiveType(input: any) {
  return typeof input !== 'object';
}
