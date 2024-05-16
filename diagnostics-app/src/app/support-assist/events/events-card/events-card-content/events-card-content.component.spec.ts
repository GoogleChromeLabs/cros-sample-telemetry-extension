/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsCardContentComponent} from './events-card-content.component';

describe('EventsCardContentComponent', () => {
  let component: EventsCardContentComponent;
  let fixture: ComponentFixture<EventsCardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsCardContentComponent],
    });
    fixture = TestBed.createComponent(EventsCardContentComponent);
    component = fixture.componentInstance;
    component.event = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
