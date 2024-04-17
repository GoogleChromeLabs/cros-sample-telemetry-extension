import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';
import {
  GetSubjectResponse,
  RoutineV2Service,
} from 'app/core/services/routine-v2.service';
import {
  TestOrchestratorService,
  TestResult,
  V2TestResult,
} from 'app/core/services/test-orchestrator.service';
import {RmaTestType} from 'common/config/rma';
import {RoutineV2Event, RoutineV2EventCategory} from 'common/message';
import {
  CreateRoutineArgumentsUnion,
  ExceptionInfo,
  RoutineFinishedInfo,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineWaitingInfo,
} from 'common/telemetry-extension-types/routines';
import {Subscription} from 'rxjs';
import {BaseTestComponent} from '../base-test/base-test.component';

enum RoutineV2State {
  // Either finished or haven't been ran yet.
  FINISHED = 'finished',
  INITIALIZED = 'initialized',
  RUNNING = 'running',
  WAITING = 'waiting',
  EXCEPTION = 'exception',
  CANCELLED = 'cancelled',
}

@Component({
  selector: 'app-routine-v2-test',
  templateUrl: './routine-v2-test.component.html',
  styleUrls: ['./routine-v2-test.component.css'],
})
export class RoutineV2TestComponent implements BaseTestComponent {
  @Input() index!: number;
  @Input() title!: string;
  @Input() argument!: CreateRoutineArgumentsUnion;
  @Output() testCompleted = new EventEmitter<void>();

  public RoutineV2State = RoutineV2State;

  // The output, which may be either routine result or user action.
  public output?: object | string;
  // Whether the routine has passed. Only shown if the routine is finished.
  public hasPassed = false;
  // An integer between 0 ~ 100 detailing the percentage ran of the routine.
  public percentage = 0;
  // The state of the underlying routine.
  public routineState: RoutineV2State = RoutineV2State.FINISHED;
  // The routine id associated with the card, possibly null if no routine is
  // running.
  public uuid?: string;
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

  constructor(
    private testOrchestrator: TestOrchestratorService,
    private loggingService: LoggingService,
    private routineV2Service: RoutineV2Service,
  ) {}

  ngOnDestroy() {
    if (this.uuid !== undefined) {
      this.cancelRoutine();
    }
    this.saveResultToCache();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  async ngOnInit() {
    const supported = this.testOrchestrator.getTestConfig(this.index)
      ?.supported;
    if (supported !== null && !supported) {
      this.output = 'Routine unsupported';
      return;
    }
    try {
      const getSubjectResponse: GetSubjectResponse =
        await this.routineV2Service.getSubject(this.argument);

      if (!getSubjectResponse.success) {
        this.loggingService.error(
          'Failed to get routine V2 subject: ',
          getSubjectResponse.error,
        );
        return;
      }

      if (!getSubjectResponse.subject) {
        this.loggingService.error(
          'Invalid routine V2 subject: ',
          getSubjectResponse,
        );
        return;
      }

      this.subscriptions.push(
        getSubjectResponse.subject.subscribe({
          next: (event: RoutineV2Event) => {
            this.handleEventResponse(event);
          },
        }),
      );

      // If test-orchestrator is doing a full run, start the routine directly.
      if (this.testOrchestrator.getIsRunningValue()) {
        this.startRoutine();
        return;
      }

      // Otherwise, attempt to load cache state for viewing past result.
      let cache = this.testOrchestrator.getTestResult(this.index);
      // If the percentage is 0, there is no need to unload the cache result.
      if (cache !== null && cache.percentage > 0) {
        cache = cache as V2TestResult;
        this.output = cache.details;
        this.hasPassed = cache.passed;
        this.percentage = cache.percentage;
      }
    } catch (err) {
      this.loggingService.error('Failed to initialize routine v2 test: ', err);
    }
  }

  private async handleEventResponse(event: RoutineV2Event) {
    switch (event.eventCategory) {
      case RoutineV2EventCategory.INITIALIZED: {
        this.output = 'initialized';
        this.routineState = RoutineV2State.RUNNING;
        const routineInitializedInfo = event.event as RoutineInitializedInfo;
        if (!this.checkUUID(routineInitializedInfo.uuid)) {
          break;
        }
        break;
      }
      case RoutineV2EventCategory.RUNNING: {
        this.output = 'running...';
        this.routineState = RoutineV2State.RUNNING;
        const routineRunningInfo = event.event as RoutineRunningInfo;
        if (!this.checkUUID(routineRunningInfo.uuid)) {
          break;
        }
        if (routineRunningInfo.percentage) {
          this.percentage = routineRunningInfo.percentage;
        }
        break;
      }
      case RoutineV2EventCategory.WAITING: {
        this.routineState = RoutineV2State.WAITING;
        const routineWaitingInfo = event.event as RoutineWaitingInfo;
        if (!this.checkUUID(routineWaitingInfo.uuid)) {
          break;
        }
        if (routineWaitingInfo.percentage) {
          this.percentage = routineWaitingInfo.percentage;
        }
        this.output = 'Waiting: ' + routineWaitingInfo.message;
        break;
      }
      case RoutineV2EventCategory.EXCEPTION: {
        this.routineState = RoutineV2State.EXCEPTION;
        const routineExceptionInfo = event.event as ExceptionInfo;
        if (!this.checkUUID(routineExceptionInfo.uuid)) {
          break;
        }
        this.percentage = 0;
        this.output = 'Exception: ' + routineExceptionInfo.debugMessage;
        this.onTestComplete();
        break;
      }
      case RoutineV2EventCategory.FINISHED: {
        this.routineState = RoutineV2State.FINISHED;
        const routineFinishedInfo = event.event as RoutineFinishedInfo;
        if (!this.checkUUID(routineFinishedInfo.uuid)) {
          break;
        }
        this.percentage = 100;
        this.hasPassed = routineFinishedInfo.hasPassed
          ? routineFinishedInfo.hasPassed
          : false;
        this.output = routineFinishedInfo.detail;
        this.uuid = undefined;
        this.onTestComplete();
        break;
      }
    }
  }

  private checkUUID(uuid: string | undefined): boolean {
    if (this.uuid !== uuid) {
      this.loggingService.error(
        'Error: uuid not matched, expected ' + this.uuid + ' got ' + uuid,
      );
      return false;
    }
    return true;
  }

  saveResultToCache() {
    // Do not save result to cache if percentage is 0. This would prevent
    // showing failed when the test was not ran
    if (this.percentage === 0) {
      return;
    }
    const result: TestResult = {
      title: this.title,
      testType: RmaTestType.ROUTINE_V2,
      percentage: this.percentage,
      passed: this.hasPassed,
      details: this.output!,
    };
    this.testOrchestrator.saveTestResult(this.index, result);
  }

  onTestComplete() {
    this.saveResultToCache();
    this.testCompleted.emit();
  }

  public async startRoutine() {
    // Having a UUID corresponds to having a running routine. Early return if
    // routine is already running.
    if (this.uuid) {
      return;
    }
    try {
      const createRoutineResponse = await this.routineV2Service.CreateRoutine(
        this.argument,
      );
      if (createRoutineResponse.uuid === undefined) {
        throw new TypeError('Create routine error');
      }
      this.uuid = createRoutineResponse.uuid;
      this.routineState = RoutineV2State.INITIALIZED;
      this.output = undefined;
      this.hasPassed = false;
      await this.routineV2Service.StartRoutine(this.uuid);
      this.percentage = 0;
    } catch (err) {
      this.loggingService.error('Failed to start v2 routine: ', err);
    }
  }

  public async cancelRoutine() {
    if (!this.uuid) {
      return;
    }

    try {
      this.routineState = RoutineV2State.CANCELLED;
      const uuid = this.uuid;
      this.uuid = undefined;
      await this.routineV2Service.CancelRoutine(uuid);
      this.output = 'routine cancelled';
      this.percentage = 0;
    } catch (err) {
      this.loggingService.error('Failed to cancel V2 routine: ', err);
    }
  }
}
