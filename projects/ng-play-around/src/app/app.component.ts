import { Component } from '@angular/core';
import { ResponsiveUiService } from './responsive-ui.service';

@Component({
  selector: 'play-around-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-play-around';

  constructor(
    private rs: ResponsiveUiService
  ) { }
}
