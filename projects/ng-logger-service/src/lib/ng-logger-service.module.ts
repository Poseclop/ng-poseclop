import { ModuleWithProviders, NgModule } from '@angular/core';

export type LogLevel = 'error' | 'warn' | 'debug' | 'no-log';

@NgModule()
export class NgLoggerServiceModule {
  public static forRoot(logLevel?: LogLevel): ModuleWithProviders<NgLoggerServiceModule> {
    return {
      ngModule: NgLoggerServiceModule,
      providers: [
        { provide: 'logLevel', useValue: logLevel }
      ]
    };
  }
}
