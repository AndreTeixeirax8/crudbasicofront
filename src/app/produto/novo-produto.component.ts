import { Component } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent {

  name = '';
  price: number | null = null;

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit():void {
  }

  onCreate(): void {
    const produto = new Produto(this.name, this.price ?? 0);
    this.produtoService.save(produto).subscribe(
      data => {
        this.toastr.success('Produto criado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.volver();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/lista']);
  }



}
