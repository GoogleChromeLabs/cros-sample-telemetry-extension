import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';
import {
  CameraTestResult,
  TestOrchestratorService,
} from 'app/core/services/test-orchestrator.service';
import {RmaTestType, RoutineV1TestArgument} from 'common/config/rma';
import {WebcamInitError} from 'ngx-webcam';
import {BaseTestComponent} from '../base-test/base-test.component';

@Component({
  selector: 'app-camera-test',
  templateUrl: './camera-test.component.html',
  styleUrls: ['./camera-test.component.css'],
})
export class CameraTestComponent implements BaseTestComponent {
  @Input() index!: number;
  @Input() title!: string;
  @Input() argument!: RoutineV1TestArgument;
  @Output() testCompleted = new EventEmitter<void>(); // Optionally pass result data

  public testRunning = false;

  public constructor(
    private loggingService: LoggingService,
    private testOrchestrator: TestOrchestratorService,
  ) {}

  ngOnInit() {
    // If test-orchestrator is doing a full run, start the routine directly.
    if (this.testOrchestrator.getIsRunningValue()) {
      this.startRoutine();
      return;
    }
  }

  startRoutine(): void {
    this.testRunning = true;
  }

  public handleInitError(error: WebcamInitError): void {
    this.loggingService.error(
      'Failed to initialize Web Camera: ',
      error.message,
    );
  }

  submitTestResult(passed: boolean) {
    const result: CameraTestResult = {
      title: this.title,
      testType: RmaTestType.CAMERA,
      percentage: 100,
      passed: passed,
    };
    this.testOrchestrator.saveTestResult(this.index, result);
    this.testCompleted.emit();
    this.testRunning = false;
  }
}
