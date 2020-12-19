import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoggedGuard } from './logged.guard';
import { NonLoggedGuard } from './non-logged.guard';

export interface ICognitoGuardsConfig {
    /** The redirect url if LoggedGuard fails (user not logged in) */
    loggedOut?: Array<string>;
    /** The redirect url if NonLoggedGuard fails (user logged in) */
    loggedIn?: Array<string>;
}

@NgModule()
export class NgCognitoGuardsModule {
    public static forRoot(config: ICognitoGuardsConfig): ModuleWithProviders<NgCognitoGuardsModule> {
        return {
            ngModule: NgCognitoGuardsModule,
            providers: [
                LoggedGuard,
                NonLoggedGuard,
                { provide: 'config', useValue: config },
            ]
        };
    }
}
