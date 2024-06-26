/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';
import {TestOrchestratorService} from 'app/core/services/test-orchestrator.service';
import {RmaTestType, TestConfig} from 'common/config/rma';
import {Subscription} from 'rxjs';
import {AudioTestComponent} from './audio-test/audio-test.component';
import {AuditPageComponent} from './audit-page/audit-page.component';
import {BaseTestComponent} from './base-test/base-test.component';
import {CameraTestComponent} from './camera-test/camera-test.component';
import {RoutineV1TestComponent} from './routine-v1-test/routine-v1-test.component';
import {RoutineV2TestComponent} from './routine-v2-test/routine-v2-test.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap = new Map<RmaTestType, any>([
  [RmaTestType.ROUTINE_V2, RoutineV2TestComponent],
  [RmaTestType.DIAGNOSTICS, RoutineV1TestComponent],
  [RmaTestType.CAMERA, CameraTestComponent],
  [RmaTestType.AUDIO, AudioTestComponent],
]);

@Component({
  selector: 'app-test-viewer',
  templateUrl: './test-viewer.component.html',
  styleUrls: ['./test-viewer.component.css'],
})
export class TestViewerComponent {
  @ViewChild('testComponentContainer', {read: ViewContainerRef})
  testComponentContainer!: ViewContainerRef;
  testComponentRef?: ComponentRef<BaseTestComponent>;
  testList!: TestConfig[];
  AUDIT_PAGE_INDEX = TestOrchestratorService.AUDIT_PAGE_INDEX;
  isRunning = false;
  currentTestIndex: number = this.AUDIT_PAGE_INDEX;
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

  constructor(
    private testOrchestrator: TestOrchestratorService,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.testOrchestrator.getTestList$().subscribe((testList) => {
        this.testList = testList;
      }),
      this.testOrchestrator.getIsRunning$().subscribe((isRunning) => {
        this.isRunning = isRunning;
      }),
      this.testOrchestrator.getCurrentTestIndex$().subscribe((index) => {
        this.currentTestIndex = index;
        this.loadComponent(this.currentTestIndex);
      }),
    );
  }

  // We must wait until angular finish loading HTML views before attempting to
  // inject child component into the TestComponentContainer. Before the view is
  // initialized, the TestComponentContainer is invalid and cannot be accessed.
  ngAfterViewInit() {
    // Loading child component in `ngAfterViewInit` should be done in a new
    // change detection cycle, which can be manually triggered via `setTimeout`
    // function.
    setTimeout(() => {
      this.loadComponent(this.currentTestIndex);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadComponent(index: number) {
    // `testComponentContainer` may not have been initialized at constructor
    // time.
    if (!this.testComponentContainer) {
      return;
    }
    this.testComponentContainer.clear();
    if (index < 0) {
      this.loadAuditComponent();
      return;
    }
    this.loadTestComponent(index);
  }

  loadAuditComponent() {
    this.testComponentRef =
      this.testComponentContainer.createComponent(AuditPageComponent);
  }

  async loadTestComponent(index: number) {
    try {
      const config = this.testList[index];
      this.testComponentRef = this.testComponentContainer.createComponent(
        componentMap.get(config.testType),
      );
      this.testComponentRef.instance.argument = config.testArgument;
      this.testComponentRef.instance.title = config.title;
      this.testComponentRef.instance.index = index;
      this.testComponentRef.instance.testCompleted.subscribe(() =>
        this.testCompleted(),
      );
    } catch (err) {
      this.loggingService.error('Error loading test component: ', err);
    }
  }

  testCompleted() {
    this.testOrchestrator.markTestComplete();
  }

  runCurrentTest() {
    if (this.testComponentRef) {
      this.testComponentRef.instance.startRoutine();
    }
  }
}
