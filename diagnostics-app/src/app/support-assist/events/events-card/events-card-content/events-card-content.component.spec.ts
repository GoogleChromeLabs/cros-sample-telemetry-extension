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
