import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';  
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUsertoken = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');
        if (currentUsertoken && userid) {
            request = request.clone({
                url: `${!request.url.startsWith('http') ? environment.API_URL :''}${request.url}`,
                setHeaders: {        
                    Authority: `${currentUsertoken}`,
                    i : `${userid}`,
                    ut : `${localStorage.getItem('utoken')}`,
                    im : `0`,

                }
            });
        }else{
            request = request.clone({
                url: `${!request.url.startsWith('http') ?  environment.API_URL :''}${request.url}`,               
            });
        }
        return next.handle(request)     
    }
}