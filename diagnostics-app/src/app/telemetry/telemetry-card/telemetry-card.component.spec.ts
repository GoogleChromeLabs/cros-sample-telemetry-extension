import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TelemetryCardComponent} from './telemetry-card.component';
import {TelemetryInfoType} from 'common/message';

describe('TelemetryCardComponent', () => {
  let component: TelemetryCardComponent;
  let fixture: ComponentFixture<TelemetryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelemetryCardComponent],
    });
    fixture = TestBed.createComponent(TelemetryCardComponent);
    component = fixture.componentInstance;
    component.type = TelemetryInfoType.BATTERY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
