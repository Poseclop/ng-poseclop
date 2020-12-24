import { NgModule } from '@angular/core';
import { NgResponsiveUiModule } from 'dist/ng-responsive-ui/public-api';
import { MaterialModule } from './material.module';



@NgModule({
  exports: [
    MaterialModule,
    NgResponsiveUiModule
  ]
})
export class SharedModule { }
