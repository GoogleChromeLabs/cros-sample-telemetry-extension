/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {isPrimitiveType} from '../app-utils';

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

  log(level: LogLevel, ...args: any[]) {
    this.ngZone.run(() => {
      const formattedArgs = args.map((arg) => {
        if (isPrimitiveType(arg)) {
          return String(arg);
        }
        // In certain error types (e.g. DOMException), the error has a message
        // but is not JSON serializable.
        if (arg && arg.message) {
          return arg.message;
        }
        return JSON.stringify(arg);
      });
      const message = formattedArgs.join('');
      this.logs$.next([
        ...this.logs$.value,
        {timestamp: new Date(), level, message},
      ]);
    });
  }

  debug(...args: any[]) {
    this.log(LogLevel.Debug, ...args);
  }
  info(...args: any[]) {
    this.log(LogLevel.Info, ...args);
  }
  warn(...args: any[]) {
    this.log(LogLevel.Warn, ...args);
  }
  error(...args: any[]) {
    // For error logs, logging service should also log to console.
    console.error(...args);
    this.log(LogLevel.Error, ...args);
  }

  getLogs(): Observable<LogEntry[]> {
    return this.logs$.asObservable();
  }
}
