import { Component } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProductoComponent {

  produtos: Produto[] = [];
  listaVacia =undefined;
  isAdmin?:boolean;

  currentPage = 1; // Página atual
  itemsPerPage = 5; // Itens por página
  totalItems = 0; // Total de itens no servidor

  constructor(
    private produtoService: ProdutoService,
    private tokenService: TokenService
    
    ) { }

  ngOnInit():void {
    this.carregarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }
/*
  carregarProductos(): void {
    this.produtoService.lista().subscribe(
      data => {
        this.produtos = data;
      },
      err => {
        console.log(err);
      }
    );
  }*/

  carregarProductos(): void {
    this.produtoService.lista(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        this.produtos = response.data;
        this.totalItems = response.meta.totalItems;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  borrar(id: number):void {
   Swal.fire({
    title:'Are you sure?',
    text:'You will not be able to recover this imaginary file',
    icon:'warning',
    showCancelButton:true,
    confirmButtonText:'Yes, delete it',
    cancelButtonText:'No keep it',
   }).then((result)=>{
    this.produtoService.delete(id).subscribe(res => this.carregarProductos())
    if(result.value){
      Swal.fire('Deleted','Your Imaginary file has deleted','success')
    }else if (result.dismiss === Swal.DismissReason.cancel){
      Swal.fire(
        'Canceled','Your imaginary file is safe','error'
      )
    }
   })
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.carregarProductos();
    }
  }
  
  proximaPagina(): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.carregarProductos();
    }
  }

}
