import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, tap } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = environment.usuarioURL;
  //usuarioUmURL = environment.usuarioUmURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}`);
  }
/*
  public detail(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioURL}/${id}`);
  }*/
  public detail(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioURL}/${id}`).pipe(
      tap(data => console.log('Resposta do serviço:', data)),
      catchError(err => {
        console.error('Erro no serviço:', err);
        throw err;
      })
    );
  }
  /*
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
