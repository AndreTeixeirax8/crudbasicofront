import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { LoginUsuarioDto } from './models/login-usuario.dto';
import { Observable } from 'rxjs';
import { NovoUsuarioDto } from './models/novo-usuario.dto';
import { TokenDto } from './models/token.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  login(dto:LoginUsuarioDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'login',dto)
  }

  registro(dto:NovoUsuarioDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'novo',dto)
  }

  refresh(dto:TokenDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'refresh',dto)
  }
}
