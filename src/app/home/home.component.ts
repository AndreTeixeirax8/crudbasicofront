import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { NoticiaService } from '../services/noticia.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName?: string;
  noticias: any[] = []; // Array para armazenar as notícias

  constructor(
    private tokenService: TokenService,
    private noticiaService: NoticiaService // Injete o serviço NoticiaService
  ) {}

  ngOnInit(): void {
    const userName = this.tokenService.getUserName();
    if (userName !== null) {
      this.userName = userName;
    }
    this.carregarNoticias(); // Chama a função para carregar as notícias
  }

  carregarNoticias() {
    this.noticiaService.getNoticias().subscribe(
      (data: any[]) => {
        this.noticias = data; // Armazena as notícias no array
      },
      (error) => {
        console.log('Erro ao carregar notícias', error);
      }
    );
  }
}
