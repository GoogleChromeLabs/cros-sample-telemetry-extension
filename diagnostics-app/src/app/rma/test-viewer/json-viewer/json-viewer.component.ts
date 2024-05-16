/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {Component, Input} from '@angular/core';
import {isPrimitiveType, originalOrder} from 'app/core/app-utils';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css'],
})
export class JsonViewerComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({required: true}) output!: any;
  @Input({required: true}) level!: number;

  // Used in HTML template.
  public originalOrder = originalOrder;
  public isPrimitiveType = isPrimitiveType;
}
