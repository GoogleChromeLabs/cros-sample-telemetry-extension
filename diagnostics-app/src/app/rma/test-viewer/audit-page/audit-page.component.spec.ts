import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuditPageComponent} from './audit-page.component';

describe('AuditPageComponent', () => {
  let component: AuditPageComponent;
  let fixture: ComponentFixture<AuditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditPageComponent],
    });
    fixture = TestBed.createComponent(AuditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
