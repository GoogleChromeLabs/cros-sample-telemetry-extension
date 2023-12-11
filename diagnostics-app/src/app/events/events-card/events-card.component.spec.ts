import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsService} from 'app/core/services/events.service';
import {EventCategory} from 'common/telemetry-extension-types';
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
