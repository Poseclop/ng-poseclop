import { Component } from '@angular/core';
import { NgLoggerService } from 'projects/ng-logger-service/src/public-api';

@Component({
  selector: 'play-around-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    logger: NgLoggerService
  ) {
    const test = 2;
    logger.log('%cDOES IT WORK? %cI m not sure', 'color:red', 'color:blue', test);
    logger.warn('%cDOES IT WORK? %cI m not sure', 'color:red', 'color:blue', test);
    logger.error('%cDOES IT WORK? %cI m not sure', 'color:red', 'color:blue', test);
  }
}
