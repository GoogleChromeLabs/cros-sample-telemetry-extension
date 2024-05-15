/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnosticsDashboardComponent} from './diagnostics-dashboard.component';

describe('DiagnosticsDashboardComponent', () => {
  let component: DiagnosticsDashboardComponent;
  let fixture: ComponentFixture<DiagnosticsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticsDashboardComponent],
    });
    fixture = TestBed.createComponent(DiagnosticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
