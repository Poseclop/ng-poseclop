import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GetPipe } from './get.pipe';


@NgModule({
  declarations: [GetPipe],
  imports: [HttpClientModule],
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
