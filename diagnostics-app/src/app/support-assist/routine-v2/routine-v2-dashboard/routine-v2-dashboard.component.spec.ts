/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2DashboardComponent} from './routine-v2-dashboard.component';

describe('RoutineV2DashboardComponent', () => {
  let component: RoutineV2DashboardComponent;
  let fixture: ComponentFixture<RoutineV2DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2DashboardComponent],
    });
    fixture = TestBed.createComponent(RoutineV2DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
