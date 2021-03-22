import { NgModule } from '@angular/core';
import { NgAnimationsComponent } from './ng-animations.component';
import { RubberBandDirective } from './directives/rubber-band.directive';



@NgModule({
  declarations: [NgAnimationsComponent, RubberBandDirective],
  imports: [
  ],
  exports: [NgAnimationsComponent]
})
export class NgAnimationsModule { }
