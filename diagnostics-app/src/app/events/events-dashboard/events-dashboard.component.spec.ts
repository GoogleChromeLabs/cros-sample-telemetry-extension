import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDashboardComponent } from './events-dashboard.component';

describe('EventsDashboardComponent', () => {
  let component: EventsDashboardComponent;
  let fixture: ComponentFixture<EventsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsDashboardComponent]
    });
    fixture = TestBed.createComponent(EventsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
