import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsDashboardComponent } from './diagnostics-dashboard.component';

describe('DiagnosticsDashboardComponent', () => {
  let component: DiagnosticsDashboardComponent;
  let fixture: ComponentFixture<DiagnosticsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticsDashboardComponent]
    });
    fixture = TestBed.createComponent(DiagnosticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
