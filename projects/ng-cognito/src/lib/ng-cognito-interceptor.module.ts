import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CognitoInterceptor } from './cognito.interceptor';

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CognitoInterceptor, multi: true },
    ]
})
export class NgCognitoInterceptorModule { }
