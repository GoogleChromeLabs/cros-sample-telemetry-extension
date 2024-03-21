import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
}

@Injectable({providedIn: 'root'})
export class LoggingService {
  private logs$ = new BehaviorSubject<LogEntry[]>([]);

  constructor(private ngZone: NgZone) {}

  log(level: LogLevel, message: string) {
    this.ngZone.run(() => {
      this.logs$.next([
        ...this.logs$.value,
        {timestamp: new Date(), level, message},
      ]);
    });
  }

  debug(message: string) {
    this.log(LogLevel.Debug, message);
  }
  info(message: string) {
    this.log(LogLevel.Info, message);
  }
  warn(message: string) {
    this.log(LogLevel.Warn, message);
  }
  error(message: string) {
    this.log(LogLevel.Error, message);
  }

  getLogs(): Observable<LogEntry[]> {
    return this.logs$.asObservable();
  }
}
