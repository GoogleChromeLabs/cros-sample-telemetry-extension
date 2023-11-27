import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCategory} from '@common/dpsl';
import {EventsCardComponent} from './events-card.component';
import {EventsService} from 'src/app/core/services/events.service';

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
