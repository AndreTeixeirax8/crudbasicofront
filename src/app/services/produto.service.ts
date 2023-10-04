import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.productoURL}`);
  }

  public detail(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.productoURL}${id}`);
  }

  public save(producto: Produto): Observable<any> {
    return this.httpClient.post<any>(`${this.productoURL}`, producto);
  }

  public update(id: number, producto: Produto): Observable<any> {
    return this.httpClient.put<any>(`${this.productoURL}${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productoURL}${id}`);
  }
}
