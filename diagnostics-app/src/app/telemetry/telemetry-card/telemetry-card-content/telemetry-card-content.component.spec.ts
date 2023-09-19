import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryCardContentComponent } from './telemetry-card-content.component';

describe('TelemetryCardContentComponent', () => {
  let component: TelemetryCardContentComponent;
  let fixture: ComponentFixture<TelemetryCardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelemetryCardContentComponent]
    });
    fixture = TestBed.createComponent(TelemetryCardContentComponent);
    component = fixture.componentInstance;
    component.info = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
