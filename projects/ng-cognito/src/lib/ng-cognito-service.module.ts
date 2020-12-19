import { NgModule, ModuleWithProviders } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoService } from './cognito.service';

@NgModule({})
export class NgCognitoServiceModule {
    public static forRoot(userPool: CognitoUserPool): ModuleWithProviders<NgCognitoServiceModule> {
        return {
            ngModule: NgCognitoServiceModule,
            providers: [
                CognitoService,
                { provide: 'userPool', useValue: userPool }
            ]
        };
    }
}
