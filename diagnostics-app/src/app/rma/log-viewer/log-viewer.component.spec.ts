import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogViewerComponent} from './log-viewer.component';

describe('LogViewerComponent', () => {
  let component: LogViewerComponent;
  let fixture: ComponentFixture<LogViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogViewerComponent],
    });
    fixture = TestBed.createComponent(LogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
