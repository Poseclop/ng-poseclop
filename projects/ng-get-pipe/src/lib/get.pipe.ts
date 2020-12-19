import { Inject, Pipe, PipeTransform, ɵSafeUrl } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Pipe({
    name: 'get'
})
export class GetPipe implements PipeTransform {

    constructor(
        private http: HttpClient,
        /** The base url for get request */
        @Inject('defaultUrl') private defaultUrl?: string
    ) { }

    transform(url: string, rootUrl?: string): Observable<ɵSafeUrl> {
        return this.http.get(`${rootUrl || this.defaultUrl}${url}`);
    }

}
