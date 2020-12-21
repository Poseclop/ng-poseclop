import { ModuleWithProviders, NgModule } from '@angular/core';
import { GetPipe } from './get.pipe';


@NgModule({
  declarations: [GetPipe],
  exports: [GetPipe]
})
export class NgGetPipeModule {
  public static forRoot(defaultUrl?: string): ModuleWithProviders<NgGetPipeModule> {
    return {
      ngModule: NgGetPipeModule,
      providers: [
        { provide: 'defaultUrl', useValue: defaultUrl }
      ]
    };
  }
}
