import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import {LogEntry, LoggingService} from 'app/core/services/logging.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css'],
})
export class LogViewerComponent {
  logs$: Observable<LogEntry[]> = this.loggingService.getLogs();

  formatTimestamp(timestamp: Date): string {
    return timestamp.toISOString();
  }

  constructor(private loggingService: LoggingService) {}
}
