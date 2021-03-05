import { Inject, Injectable } from '@angular/core';
import { LogLevel } from './ng-logger-service.module';

enum ELogLevel {
  'no-log' = 0,
  'error' = 1,
  'warn' = 2,
  'debug' = 3,
}

@Injectable({
  providedIn: 'root'
})
export class NgLoggerService {

  public get log(): (...args: any[]) => any {
    const log = console.log.bind(window.console);

    return ELogLevel[this.logLevel] >= ELogLevel.debug ? log : () => { };
  }

  public get warn(): (...args: any[]) => any {
    const warn = console.warn.bind(window.console);

    // Implemnt server-side logging

    return ELogLevel[this.logLevel] >= ELogLevel.warn ? warn : () => { };
  }

  public get error(): (...args: any[]) => any {
    const error = console.error.bind(window.console);

    return ELogLevel[this.logLevel] >= ELogLevel.error ? error : () => { };
  }

  constructor(
    @Inject('logLevel') private logLevel: LogLevel
  ) { }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

}
