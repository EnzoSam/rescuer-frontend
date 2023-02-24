import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AuthService } from './authService.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _tokenService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let autReq = req;
    const token = this._tokenService.getToken();

    if (token != null && token != '') {
      autReq = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    return next.handle(autReq).pipe(
      catchError((requestError: HttpErrorResponse)=>
      {        
          //this._servicio.setNewState({ok:false,data:requestError})
          return next.handle(autReq);
      })
    );

  }

}


