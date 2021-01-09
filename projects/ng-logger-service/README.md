# NgLoggerService

Simple logger service for angular. Behaves exactly as console.log / warn / error but allows to select a log level.

## Installation
1. Install the Package with `npm install @poseclop/ng-logger-service`
2. Import the module in your application. Include a default logging level
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgLoggerServiceModule.forRoot(environment.production ? 'ERROR' : 'DEBUG')
        ]
    })
    ```

### Usage
Provides log, warn and error functions
Update the log level via setLogLevel method
log Levels: `'DEBUG' | 'WARN' | 'ERROR' | 'NO_LOG'`