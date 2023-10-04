import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoURL = environment.produtoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.produtoURL}`);
  }

  public detail(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.produtoURL}${id}`);
  }

  public save(produto: Produto): Observable<any> {
    return this.httpClient.post<any>(`${this.produtoURL}`, produto);
  }

  public update(id: number, producto: Produto): Observable<any> {
    return this.httpClient.put<any>(`${this.produtoURL}${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.produtoURL}${id}`);
  }
}
