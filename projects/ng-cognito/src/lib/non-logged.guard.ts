import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ICognitoGuardsConfig } from './ng-cognito-guards.module';
import { CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root'
})
export class NonLoggedGuard implements CanActivate {

  constructor(
    private $cognito: CognitoService,
    private $router: Router,
    @Inject('config') private config: ICognitoGuardsConfig
  ) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.$cognito.logged$.pipe(
      take(1),
      map(logged => {
        if (!logged) {
          return true;
        }
        return this.$router.createUrlTree(this.config.loggedIn || ['/']);
      })
    );
  }

}
