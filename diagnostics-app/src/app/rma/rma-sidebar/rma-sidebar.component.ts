/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {Component} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';
import {TestOrchestratorService} from 'app/core/services/test-orchestrator.service';
import {TestConfig} from 'common/config/rma';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rma-sidebar',
  templateUrl: './rma-sidebar.component.html',
  styleUrls: ['./rma-sidebar.component.css'],
})
export class RmaSidebarComponent {
  testIndex!: number;
  testList!: TestConfig[];
  // We will only allow for modification of enable/disable, and to switch to
  // different test view when the orchestrator is not running.
  isRunning!: boolean;
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

  constructor(
    private testOrchestrator: TestOrchestratorService,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.testOrchestrator.getCurrentTestIndex$().subscribe((testIndex) => {
        this.testIndex = testIndex;
      }),
      this.testOrchestrator.getIsRunning$().subscribe((isRunning) => {
        this.isRunning = isRunning;
      }),
      this.testOrchestrator
        .getTestList$()
        .subscribe((testList: TestConfig[]) => {
          this.testList = testList;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleTestNavigation(event: MouseEvent, index: number) {
    this.testOrchestrator.setCurrentTestIndex(index);
    return;
  }

  handleCheckboxClick(event: Event, index: number) {
    // Prevent checking checkbox from redirecting to different test index.
    event.stopPropagation();
    const isChecked = (event.target as HTMLInputElement).checked;
    this.testOrchestrator.setTestlistEnabled(index, isChecked);
  }

  startTests() {
    this.testOrchestrator.startTests();
  }

  stopTests() {
    this.testOrchestrator.stopTests();
  }

  getCurrentTestIndex$() {
    return this.testOrchestrator.getCurrentTestIndex$();
  }

  getTestStatus(index: number): 'pending' | 'passed' | 'failed' {
    const result = this.testOrchestrator.getTestResult(index);
    if (result === null) {
      return 'pending';
    }
    if (result.passed) {
      return 'passed';
    }
    return 'failed';
  }

  isUnsupported(index: number) {
    return (
      this.testList[index].supported !== null && !this.testList[index].supported
    );
  }
}
