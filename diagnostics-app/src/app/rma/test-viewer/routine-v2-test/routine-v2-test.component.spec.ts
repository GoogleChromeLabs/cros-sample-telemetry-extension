/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2TestComponent} from './routine-v2-test.component';

describe('RoutineV2TestComponent', () => {
  let component: RoutineV2TestComponent;
  let fixture: ComponentFixture<RoutineV2TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2TestComponent],
    });
    fixture = TestBed.createComponent(RoutineV2TestComponent);
    component = fixture.componentInstance;
    component.index = 0;
    component.title = 'test';
    component.argument = {fan: {}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
