import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  defaultDiagnosticsRefreshInterval,
  refreshIntervals,
} from 'app/core/config/data-refresh-intervals';
import {DiagnosticsService} from 'app/core/services/diagnostics.service';
import {LoggingService} from 'app/core/services/logging.service';
import {
  TestOrchestratorService,
  TestResult,
  V1TestResult,
} from 'app/core/services/test-orchestrator.service';
import {RmaTestType, RoutineV1TestArgument} from 'common/config/rma';
import {ResponseErrorInfoMessage, RoutineUpdateResponse} from 'common/message';
import {
  GetRoutineUpdateResponse,
  RoutineStatus,
} from 'common/telemetry-extension-types/legacy-diagnostics';
import {BaseTestComponent} from '../base-test/base-test.component';

enum DiagnosticsCardState {
  READY = 'ready',
  RUNNING = 'running',
  STOPPING = 'stopping',
  WAITING_FOR_USER_ACTION = 'waiting_for_user_action',
}

@Component({
  selector: 'app-routine-v1-test',
  templateUrl: './routine-v1-test.component.html',
  styleUrls: ['./routine-v1-test.component.css'],
})
export class RoutineV1TestComponent implements BaseTestComponent {
  @Input() index!: number;
  @Input() title!: string;
  @Input() argument!: RoutineV1TestArgument;
  @Output() testCompleted = new EventEmitter<void>(); // Optionally pass result data

  public DiagnosticsCardState = DiagnosticsCardState;

  // Latest information received about the routine.
  public routineInfo?: GetRoutineUpdateResponse;
  // Current state  of the diagnostics card.
  public state: DiagnosticsCardState = DiagnosticsCardState.READY;
  // The interval id for polling routine state, undefined if no routine is
  // running.
  private intervalId?: number;
  // The routine id of the running routine, undefined if no routine is running.
  private routineId?: number;

  // Contains all states considered terminal states of RoutineStatus.
  readonly terminalStates = new Set<RoutineStatus>([
    RoutineStatus.passed,
    RoutineStatus.failed,
    RoutineStatus.error,
    RoutineStatus.cancelled,
    RoutineStatus.failed_to_start,
    RoutineStatus.removed,
    RoutineStatus.unsupported,
    RoutineStatus.not_run,
  ]);

  public constructor(
    private diagnosticsService: DiagnosticsService,
    private loggingService: LoggingService,
    private testOrchestrator: TestOrchestratorService,
  ) {}

  ngOnInit() {
    // If test-orchestrator is doing a full run, start the routine directly.
    if (this.testOrchestrator.getIsRunningValue()) {
      this.startRoutine();
      return;
    }

    // Otherwise, attempt to load cache state for viewing past result.
    const cache = this.testOrchestrator.getTestResult(this.index);
    if (cache !== null) {
      this.routineInfo = (cache as V1TestResult)!.routineInfo;
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
    this.saveResultToCache();
  }

  hasPassed(): boolean | null {
    if (this.routineInfo && this.terminalStates.has(this.routineInfo.status)) {
      // Once in terminal state, it must have either passed or failed.
      return this.routineInfo.status === RoutineStatus.passed;
    }
    return null;
  }

  percentage(): number {
    if (!this.routineInfo) {
      return 0;
    }
    return this.routineInfo.progress_percent;
  }

  saveResultToCache() {
    if (this.percentage() === 0) {
      return;
    }
    const result: TestResult = {
      title: this.title!,
      // Either calling the diagnostics API through telemetry extension, or a custom test that is written locally.
      testType: RmaTestType.DIAGNOSTICS,
      passed: this.hasPassed() === null ? false : this.hasPassed()!,
      percentage: this.percentage(),
      routineInfo: this.routineInfo,
    };
    this.testOrchestrator.saveTestResult(this.index, result);
  }

  onTestComplete() {
    this.testCompleted.emit();
  }

  private handleResponse() {
    this.loggingService.info(
      'handling response' + JSON.stringify(this.routineInfo),
    );
    if (!this.routineInfo) {
      this.loggingService.error(
        ResponseErrorInfoMessage.INVALID_DIAGNOSTICS_ROUTINE_INFO,
      );
      return;
    }

    if (this.routineInfo.status === RoutineStatus.waiting_user_action) {
      this.state = DiagnosticsCardState.WAITING_FOR_USER_ACTION;
    } else if (this.terminalStates.has(this.routineInfo.status)) {
      this.saveResultToCache();
      this.stopRoutine();
    }
  }

  public async startRoutine() {
    if (this.state !== DiagnosticsCardState.READY) {
      return;
    }
    try {
      let res = await this.diagnosticsService.startRoutine(
        this.argument.category,
        this.argument.argument,
      );
      res = res as RoutineUpdateResponse;
      this.state = DiagnosticsCardState.RUNNING;
      this.routineId = res.id;
      this.routineInfo = res.info;

      const interval = refreshIntervals.diagnostics.has(this.argument.category)
        ? refreshIntervals.diagnostics.get(this.argument.category)
        : defaultDiagnosticsRefreshInterval;
      this.intervalId = window.setInterval(() => {
        if (this.state === DiagnosticsCardState.RUNNING) {
          this.getRoutineStatus();
        }
      }, interval);

      this.handleResponse();
    } catch (err) {
      this.loggingService.error(JSON.stringify(err));
    }
  }

  public async stopRoutine() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    // The routine is no longer running.
    if (this.state !== DiagnosticsCardState.RUNNING) {
      return;
    }

    try {
      this.state = DiagnosticsCardState.STOPPING;
      if (this.routineId === undefined) {
        throw 'Routine ID is undefined';
      }
      await this.diagnosticsService.stopRoutine(this.routineId);
    } catch (err) {
      this.loggingService.error(JSON.stringify(err));
    }

    this.routineId = undefined;
    this.state = DiagnosticsCardState.READY;
    this.onTestComplete();
  }

  public async resumeRoutine() {
    try {
      let res = await this.diagnosticsService.resumeRoutine(this.routineId!);
      res = res as RoutineUpdateResponse;
      this.state = DiagnosticsCardState.RUNNING;
      this.routineInfo = res.info;
      this.handleResponse();
    } catch (err) {
      this.loggingService.error(JSON.stringify(err));
    }
  }

  public async getRoutineStatus() {
    try {
      let res = await this.diagnosticsService.getRoutineStatus(this.routineId!);
      res = res as RoutineUpdateResponse;
      this.routineInfo = res.info;
      this.handleResponse();
    } catch (err) {
      this.loggingService.error(JSON.stringify(err));
    }
  }
}
