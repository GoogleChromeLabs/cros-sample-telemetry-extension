import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnosticsCardComponent} from './diagnostics-card.component';

import {RoutineType} from 'common/telemetry-extension-types/legacy-diagnostics';

describe('DiagnosticsCardComponent', () => {
  let component: DiagnosticsCardComponent;
  let fixture: ComponentFixture<DiagnosticsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticsCardComponent],
    });
    fixture = TestBed.createComponent(DiagnosticsCardComponent);
    component = fixture.componentInstance;
    component.routine = RoutineType.ac_power;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
