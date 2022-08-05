// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview SharedModule exists to make commonly used components, directives
 * and pipes available for use in the templates of components in many other modules.
 * Imported by app.module.ts
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
