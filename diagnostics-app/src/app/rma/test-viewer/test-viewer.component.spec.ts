import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestOrchestratorService} from 'app/core/services/test-orchestrator.service';
import {TestViewerComponent} from './test-viewer.component';

describe('TestViewerComponent', () => {
  let component: TestViewerComponent;
  let fixture: ComponentFixture<TestViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestViewerComponent],
      providers: [TestOrchestratorService],
    });
    fixture = TestBed.createComponent(TestViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
