/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {Component, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {LoggingService} from 'app/core/services/logging.service';
import {
  CameraTestResult,
  TestOrchestratorService,
} from 'app/core/services/test-orchestrator.service';
import {RmaTestType, RoutineV1TestArgument} from 'common/config/rma';
import {BaseTestComponent} from '../base-test/base-test.component';

@Component({
  selector: 'app-audio-test',
  templateUrl: './audio-test.component.html',
  styleUrls: ['./audio-test.component.css'],
})
export class AudioTestComponent implements BaseTestComponent {
  @Input() index!: number;
  @Input() title!: string;
  @Input() argument!: RoutineV1TestArgument;
  @Output() testCompleted = new EventEmitter<void>(); // Optionally pass result data

  public testRunning = false;
  public isRecording = false;
  public recordedAudioUrl: string | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  public constructor(
    private loggingService: LoggingService,
    private testOrchestrator: TestOrchestratorService,
    private ngZone: NgZone,
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

  async startRecording() {
    if (!navigator.mediaDevices.getUserMedia) {
      this.loggingService.error(
        'Media recording is not supported in this browser.',
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      // Start recording
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();

      const audioChunks: Blob[] = [];
      this.mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.ngZone.run(() => {
          const audioBlob = new Blob(audioChunks);
          this.recordedAudioUrl = URL.createObjectURL(audioBlob);
        });
      };

      this.isRecording = true;
    } catch (error) {
      this.loggingService.error('Failed to record audio: ', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      this.isRecording = false;
    }
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
