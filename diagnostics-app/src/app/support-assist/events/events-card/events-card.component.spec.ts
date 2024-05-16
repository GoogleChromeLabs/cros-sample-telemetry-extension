/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsService} from 'app/core/services/events.service';
import {EventCategory} from 'common/telemetry-extension-types/events';
import {EventsCardComponent} from './events-card.component';

describe('EventsCardComponent', () => {
  let component: EventsCardComponent;
  let fixture: ComponentFixture<EventsCardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EventsCardComponent],
      providers: [EventsService],
    });
    fixture = TestBed.createComponent(EventsCardComponent);
    component = fixture.componentInstance;
    component.category = EventCategory.audio_jack;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
