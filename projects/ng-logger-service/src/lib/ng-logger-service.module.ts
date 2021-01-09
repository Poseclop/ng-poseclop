import { ModuleWithProviders, NgModule } from '@angular/core';

export type LogLevel = 'ERROR' | 'WARN' | 'DEBUG' | 'NO_LOG';

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
