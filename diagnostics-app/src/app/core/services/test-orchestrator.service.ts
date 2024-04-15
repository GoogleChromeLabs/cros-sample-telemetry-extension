import {Injectable, NgZone} from '@angular/core';
import {RmaTestType, TestConfig, TestList} from 'common/config/rma';
import {RoutineV2Argument} from 'common/message';

import {
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
  RoutineType,
} from 'common/telemetry-extension-types/legacy-diagnostics';
import {
  RoutineSupportStatus,
  RoutineSupportStatusInfo,
} from 'common/telemetry-extension-types/routines';
import {BehaviorSubject, Observable} from 'rxjs';
import {DiagnosticsService} from './diagnostics.service';
import {LoggingService} from './logging.service';
import {RoutineV2Service} from './routine-v2.service';

export interface V2TestResult {
  title: string;
  testType: RmaTestType.ROUTINE_V2;
  percentage: number;
  passed: boolean;
  // This is a JSON serializable object to show.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export interface V1TestResult {
  // Name of the test to be displayed
  title: string;
  testType: RmaTestType.DIAGNOSTICS;
  percentage: number;
  passed: boolean;
  routineInfo?: GetRoutineUpdateResponse;
}

export interface CameraTestResult {
  title: string;
  testType: RmaTestType.CAMERA;
  percentage: number;
  passed: boolean;
}

export interface AudioTestResult {
  title: string;
  testType: RmaTestType.AUDIO;
  percentage: number;
  passed: boolean;
}

export type TestResult =
  | V2TestResult
  | V1TestResult
  | CameraTestResult
  | AudioTestResult
  | null;

@Injectable({providedIn: 'root'})
export class TestOrchestratorService {
  // The index corresponding to audit page.
  static readonly AUDIT_PAGE_INDEX = -1;

  // A list of test configs that will be run by the app. This testlist is public
  // so that the sidenav can directly access and modify its values.
  private testList = new BehaviorSubject<TestConfig[]>([]);
  // The index of the current test being displayed. If orchestrator is doing a
  // full run, this is also the test that is currently being run.
  private currentTestIndex = new BehaviorSubject<number>(
    TestOrchestratorService.AUDIT_PAGE_INDEX,
  );
  // For each test in the testlist, if the test has been run, the results will
  // be cached here for reviewing. The index of testResult should be kept in sync
  // with the index of testList.
  private testResults = new BehaviorSubject<TestResult[]>([]);
  // Whether a test is currently running.
  private isRunning = new BehaviorSubject<boolean>(false);

  constructor(
    private loggingService: LoggingService,
    private diagnosticsService: DiagnosticsService,
    private routineV2Service: RoutineV2Service,
    private ngZone: NgZone,
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    this.testList.next(await this.filterSupported(TestList));
    this.testResults.next(Array(this.testList.getValue().length).fill(null));
    this.setCurrentTestIndex(TestOrchestratorService.AUDIT_PAGE_INDEX);
  }

  // Filter and make sure to only show tests which are supported.
  private async filterSupported(testList: TestConfig[]): Promise<TestConfig[]> {
    try {
      const v1AvailableRoutinesPromise =
        this.diagnosticsService.getAvailableRoutines();

      const v2SupportedRoutinesPromise = [];
      for (const testConfig of testList) {
        if (testConfig.testType === RmaTestType.ROUTINE_V2) {
          v2SupportedRoutinesPromise.push(
            this.routineV2Service.isRoutineArgumentSupported(
              testConfig.testArgument as RoutineV2Argument,
            ),
          );
        }
      }

      // We can safely discard the results from v2 supported promise since their
      // results are cached in the service itself.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [v1AvailableRoutinesResponse] = await Promise.all([
        v1AvailableRoutinesPromise,
        ...v2SupportedRoutinesPromise,
      ]);
      const v1AvailableRoutines = (
        v1AvailableRoutinesResponse as GetAvailableRoutinesResponse
      ).routines;

      for (const testConfig of testList) {
        if (testConfig.testType === RmaTestType.DIAGNOSTICS) {
          testConfig.supported = v1AvailableRoutines.includes(
            testConfig.testArgument!.category as RoutineType,
          );
        }
        if (testConfig.testType === RmaTestType.ROUTINE_V2) {
          // Supportability cache will cache all results for v2 routines, so its not
          // costly to await.
          const supportStatus: RoutineSupportStatusInfo =
            await this.routineV2Service.isRoutineArgumentSupported(
              testConfig.testArgument as RoutineV2Argument,
            );
          testConfig.supported =
            supportStatus.status === RoutineSupportStatus.supported;
        }
        if (testConfig.testType === RmaTestType.CAMERA) {
          testConfig.supported = true;
        }
        if (testConfig.testType === RmaTestType.AUDIO) {
          testConfig.supported = true;
        }

        // disable all unsupported tests.
        if (testConfig.supported !== null && !testConfig.supported) {
          testConfig.enabled = false;
        }
      }
    } catch (error) {
      // Handle errors from either operation
      this.loggingService.error('Error occurred:' + String(error));
    }
    return testList;
  }

  // All components should access the value through this observable.
  getCurrentTestIndex$(): Observable<number> {
    return this.currentTestIndex.asObservable();
  }

  getTestList$(): Observable<TestConfig[]> {
    return this.testList.asObservable();
  }

  getTestResults$(): Observable<TestResult[]> {
    return this.testResults.asObservable();
  }

  setCurrentTestIndex(index: number) {
    this.ngZone.run(() => {
      this.currentTestIndex.next(index);
    });
  }

  getTestResult(index: number): TestResult {
    if (index < 0 || index >= this.testResults.getValue().length) {
      this.loggingService.error(
        'Invalid index access to testResults: ' + index,
      );
      return null;
    }
    return this.testResults.getValue()[index];
  }

  getTestConfig(index: number): TestConfig | null {
    if (index < 0 || index >= this.testResults.getValue().length) {
      this.loggingService.error('Invalid index access to testList: ' + index);
      return null;
    }
    return this.testList.getValue()[index];
  }

  getIsRunning$(): Observable<boolean> {
    return this.isRunning.asObservable();
  }

  getIsRunningValue(): boolean {
    return this.isRunning.getValue();
  }

  private setIsRunning(isRunning: boolean) {
    this.ngZone.run(() => {
      this.isRunning.next(isRunning);
    });
  }

  setTestlistEnabled(index: number, isEnabled: boolean) {
    this.ngZone.run(() => {
      const testList = this.testList.getValue();
      testList[index].enabled = isEnabled;
      this.testList.next(testList);
    });
  }

  startTests() {
    if (this.isRunning.value) return;
    this.setCurrentTestIndex(TestOrchestratorService.AUDIT_PAGE_INDEX);
    this.loggingService.info('started running tests');
    this.clearResultCache();
    this.setIsRunning(true);
    this.runNextTest();
  }

  private runNextTest() {
    if (this.isRunning.value) {
      let nextAvailableIndex: number = this.currentTestIndex.value + 1;
      // Find the next enabled test to be run.
      while (nextAvailableIndex! < this.testList.getValue().length) {
        if (this.testList.getValue().at(nextAvailableIndex)?.enabled) {
          this.setCurrentTestIndex(nextAvailableIndex);
          return;
        }
        nextAvailableIndex++;
      }
      // All tests have finished running. Return to audit page.
      this.setCurrentTestIndex(TestOrchestratorService.AUDIT_PAGE_INDEX);
      this.setIsRunning(false);
    }
  }

  stopTests() {
    if (this.isRunning.value) {
      // Force testViewer to stop running all tests and return to audit page.
      this.setCurrentTestIndex(TestOrchestratorService.AUDIT_PAGE_INDEX);
      this.setIsRunning(false);
    }
  }

  // This method can be called either during entire test runs, or when user only
  // restarts particular test.
  saveTestResult(testIndex: number, result: TestResult) {
    const testResults = this.testResults.getValue();
    testResults[testIndex] = result;
    this.testResults.next(testResults);
  }

  // This method clears all test result cache.
  clearResultCache() {
    this.testResults.next(Array(this.testList.getValue().length).fill(null));
  }

  // Called when the test is finished.
  markTestComplete() {
    if (this.isRunning.getValue()) {
      this.runNextTest();
    }
  }
}
