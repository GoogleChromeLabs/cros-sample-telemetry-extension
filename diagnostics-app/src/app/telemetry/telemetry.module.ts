// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview TelemetryModule defines module for the telemetry feature.
 * Imported by app.module.ts
 */

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MemoryComponent } from './cards/memory/memory.component';
import { StorageComponent } from './cards/storage/storage.component';
import { CpuComponent } from './cards/cpu/cpu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MemoryComponent,
    StorageComponent,
    CpuComponent,
  ],
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TelemetryModule {}
