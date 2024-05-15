/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CameraTestComponent} from './camera-test.component';

describe('CameraTestComponent', () => {
  let component: CameraTestComponent;
  let fixture: ComponentFixture<CameraTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraTestComponent],
    });
    fixture = TestBed.createComponent(CameraTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
