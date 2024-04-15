import {Component} from '@angular/core';
import {
  TestOrchestratorService,
  TestResult,
} from 'app/core/services/test-orchestrator.service';
import {TestConfig} from 'common/config/rma';
import {BaseTestComponent} from '../base-test/base-test.component';

class TestStatistics {
  enabledTests: number[] = [];
  passedTests: number[] = [];
  failedTests: number[] = [];
  unranTests: number[] = [];
  disabledTests: number[] = [];
}

@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.css'],
})
export class AuditPageComponent extends BaseTestComponent {
  private testList: TestConfig[] = [];
  private testResults: TestResult[] = [];
  testStatistics = new TestStatistics();

  UpdateTestStatistics() {
    this.testStatistics = new TestStatistics();
    for (const [index, testConfig] of this.testList.entries()) {
      if (!testConfig.enabled) {
        this.testStatistics.disabledTests.push(index);
        continue;
      }
      this.testStatistics.enabledTests.push(index);
      const testInfo = this.testResults[index];
      if (!testInfo) {
        this.testStatistics.unranTests.push(index);
        continue;
      }
      if (testInfo.passed) {
        this.testStatistics.passedTests.push(index);
        continue;
      }
      if (!testInfo.passed) {
        this.testStatistics.failedTests.push(index);
        continue;
      }
    }
  }

  public constructor(private testOrchestrator: TestOrchestratorService) {
    super();
  }

  ngOnInit() {
    this.testOrchestrator.getTestList$().subscribe((testList: TestConfig[]) => {
      this.testList = testList;
      this.UpdateTestStatistics();
    });
    this.testOrchestrator
      .getTestResults$()
      .subscribe((testResults: TestResult[]) => {
        this.testResults = testResults;
        this.UpdateTestStatistics();
      });
  }

  // For compatibility with the base test component interface.
  startRoutine(): void {
    return;
  }
}
