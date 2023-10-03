import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = environment.usuarioURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}`);
  }
/*
  public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.productoURL}${id}`);
  }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(`${this.productoURL}`, producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(`${this.productoURL}${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productoURL}${id}`);
  }*/
}
