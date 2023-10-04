import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError,concatMap } from 'rxjs';
import { TokenService } from '../token.service';
import { TokenDto } from '../models/token.dto';
import { AuthService } from '../auth.service';

const AUTHORIZATION = 'Authorization'
const BEARER = 'Bearer '

@Injectable()
export class ProductoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService:  AuthService,
      
    ) { }

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }

    let intReq = request;
    const token = this.tokenService.getToken();

    if (token !== null) {
      intReq = this.addToken(request, token);
    }

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
        if (err.status === 401) {
          const dto: TokenDto = new TokenDto(token!);
          return this.authService.refresh(dto).pipe(
            concatMap((data: any) => {
              this.tokenService.setToken(data.token);
              intReq = this.addToken(request, data.token);
              return next.handle(intReq);
            })
          );
        } else {
          this.tokenService.logOut();
          return throwError(err);
        }
      })
    );
  } 

  
  

  private addToken(request: HttpRequest<unknown>,token: string): HttpRequest<unknown>{
    return  request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProductoInterceptor, multi: true}];