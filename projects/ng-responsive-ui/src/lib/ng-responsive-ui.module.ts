import { NgModule } from '@angular/core';
import { ResponsiveGridDirective } from './responsive-grid.directive';
import { ResponsiveContainerDirective } from './responsive-container.directive';


@NgModule({
  declarations: [ResponsiveGridDirective, ResponsiveContainerDirective],
  exports: [ResponsiveGridDirective, ResponsiveContainerDirective]
})
export class NgResponsiveUiModule { }
