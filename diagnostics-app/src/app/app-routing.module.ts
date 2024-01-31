// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines routes for app.module
 * Imported by app.module.ts
 */

import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // Default redirect rule. Consider changing the routes here depending on what
  // the app is built for.
  {path: '', redirectTo: '/support-assist/telemetry', pathMatch: 'full'},
  {
    path: 'support-assist',
    loadChildren: () =>
      import('./support-assist/support-assist.module').then(
        (m) => m.SupportAssistModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
})
export class AppRoutingModule {}
