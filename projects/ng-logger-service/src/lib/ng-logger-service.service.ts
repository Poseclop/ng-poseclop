import { Inject, Injectable } from '@angular/core';
import { LogLevel } from './ng-logger-service.module';

enum ELogLevel {
  'NO_LOG' = 0,
  'ERROR' = 1,
  'WARN' = 2,
  'DEBUG' = 3,
}

@Injectable({
  providedIn: 'root'
})
export class NgLoggerService {

  public get log(): (...args: any[]) => any {
    const log = console.log.bind(window.console);

    return ELogLevel[this.logLevel] >= ELogLevel.DEBUG ? log : () => { };
  }

  public get warn(): (...args: any[]) => any {
    const warn = console.warn.bind(window.console);

    // Implemnt server-side logging

    return ELogLevel[this.logLevel] >= ELogLevel.WARN ? warn : () => { };
  }

  public get error(): (...args: any[]) => any {
    const error = console.error.bind(window.console);

    return ELogLevel[this.logLevel] >= ELogLevel.ERROR ? error : () => { };
  }

  constructor(
    @Inject('logLevel') private logLevel: LogLevel
  ) { }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

}
