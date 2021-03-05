import { Component } from '@angular/core';
import { ResponsiveUiService } from 'ng-responsive-ui';
import { map } from 'rxjs/operators';
import { CoreRoutes } from '../../core.routes';

@Component({
  selector: 'core-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  coreRoutes = CoreRoutes;
  desktopLayout$ = this.responsiveUiService.screenLayout$.pipe(
    map(layout => layout === 'WebLandscape' || layout === 'WebPortrait')
  );

  constructor(
    public responsiveUiService: ResponsiveUiService
  ) { }

  onNavigation(): void {
    window.scroll(0, 0);
  }

}
