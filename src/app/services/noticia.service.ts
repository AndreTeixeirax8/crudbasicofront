import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  noticiaURL = environment.noticiaURL;

  constructor(private httpClient: HttpClient) {}

  //busca noticias
  getNoticias(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.noticiaURL); // Substitua 'URL_DO_SEU_BACKEND' pela URL correta do seu backend
  }
}
