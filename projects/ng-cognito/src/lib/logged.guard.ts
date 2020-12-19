import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ICognitoGuardsConfig } from './ng-cognito-guards.module';
import { CognitoService } from './cognito.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    private _cognito: CognitoService,
    private _router: Router,
    @Inject('config') private config: ICognitoGuardsConfig
  ) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._cognito.logged$.pipe(
      take(1),
      map(logged => {
        if (logged) {
          return true;
        }
        return this._router.createUrlTree(this.config.loggedOut || ['/']);
      })
    );
  }

}
