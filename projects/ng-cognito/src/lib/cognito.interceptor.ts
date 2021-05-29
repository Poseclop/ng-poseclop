import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CognitoService } from './cognito.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoInterceptor implements HttpInterceptor {

  constructor(private cognito: CognitoService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.warn("WTGF")
    return of(this.cognito.token).pipe(
      take(1),
      exhaustMap((token: string | null) => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({ headers: new HttpHeaders().set('Authorization', token) });
        return next.handle(modifiedReq);
      })
    );
  }
}
