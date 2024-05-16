/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2CardContentComponent} from './routine-v2-card-content.component';

describe('RoutineV2CardContentComponent', () => {
  let component: RoutineV2CardContentComponent;
  let fixture: ComponentFixture<RoutineV2CardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2CardContentComponent],
    });
    fixture = TestBed.createComponent(RoutineV2CardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
