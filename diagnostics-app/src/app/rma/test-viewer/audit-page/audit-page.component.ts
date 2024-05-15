/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {Component} from '@angular/core';
import {
  TestOrchestratorService,
  TestResult,
} from 'app/core/services/test-orchestrator.service';
import {TestConfig} from 'common/config/rma';
import {Subscription} from 'rxjs';
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
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

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
    this.subscriptions.push(
      this.testOrchestrator
        .getTestList$()
        .subscribe((testList: TestConfig[]) => {
          this.testList = testList;
          this.UpdateTestStatistics();
        }),
      this.testOrchestrator
        .getTestResults$()
        .subscribe((testResults: TestResult[]) => {
          this.testResults = testResults;
          this.UpdateTestStatistics();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // For compatibility with the base test component interface.
  startRoutine(): void {
    return;
  }
}
