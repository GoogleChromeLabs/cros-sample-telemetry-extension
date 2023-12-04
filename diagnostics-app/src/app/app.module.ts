// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Main app module file of the application.
 * Imports all the submodules and global dependencies of the project.
 */

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {EventsService} from './core/services/events.service';
import {DiagnosticsModule} from './diagnostics/diagnostics.module';
import {EventsModule} from './events/events.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {RoutineV2Module} from './routine-v2/routine-v2.module';
import {SharedModule} from './shared/shared.module';
import {TelemetryModule} from './telemetry/telemetry.module';

const initializeEventService = (
  eventsService: EventsService,
): (() => Promise<void>) => {
  return () => eventsService.Init();
};

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    SideNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    DiagnosticsModule,
    EventsModule,
    RoutineV2Module,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.serviceWorker,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SharedModule,
    TelemetryModule,
  ],
  providers: [
    EventsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeEventService,
      multi: true,
      deps: [EventsService],
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
