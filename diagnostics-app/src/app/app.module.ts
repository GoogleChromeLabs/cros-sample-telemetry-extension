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
import {RoutineV2Service} from './core/services/routine-v2.service';
import {DiagnosticsModule} from './diagnostics/diagnostics.module';
import {EventsModule} from './events/events.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {RoutineV2Module} from './routine-v2/routine-v2.module';
import {SharedModule} from './shared/shared.module';
import {TelemetryModule} from './telemetry/telemetry.module';

function initializeEventServiceFactory(
  eventsService: EventsService,
): () => Promise<void> {
  return () => eventsService.Init();
}

function initializeRoutineV2ServiceFactory(
  routineV2Service: RoutineV2Service,
): () => Promise<void> {
  return () => routineV2Service.Init();
}

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
      useFactory: initializeEventServiceFactory,
      multi: true,
      deps: [EventsService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRoutineV2ServiceFactory,
      multi: true,
      deps: [RoutineV2Service],
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
