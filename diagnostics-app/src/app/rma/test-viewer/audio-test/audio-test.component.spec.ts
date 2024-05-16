/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AudioTestComponent} from './audio-test.component';

describe('AudioTestComponent', () => {
  let component: AudioTestComponent;
  let fixture: ComponentFixture<AudioTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioTestComponent],
    });
    fixture = TestBed.createComponent(AudioTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
