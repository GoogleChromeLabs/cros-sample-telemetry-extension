/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TestConfig} from 'common/config/rma';

// This component outlines the interface for a test component. All V1, V2 and
// custom tests should inherit from this component.
@Component({
  selector: 'app-base-test',
  templateUrl: './base-test.component.html',
})
export abstract class BaseTestComponent {
  @Input() index!: number;
  @Input() title!: string;
  @Input() argument!: TestConfig['testArgument'];
  @Output() testCompleted = new EventEmitter<void>();

  abstract startRoutine(): void;
}
