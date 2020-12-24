import { Component } from '@angular/core';
import { ResponsiveUiService } from 'dist/ng-responsive-ui/public-api';
import { map } from 'rxjs/operators';
import { coreRoutes } from '../../core.routes';

@Component({
  selector: 'core-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  coreRoutes = coreRoutes;
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
