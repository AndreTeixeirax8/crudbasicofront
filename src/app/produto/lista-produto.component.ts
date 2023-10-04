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

  constructor(
    private produtoService: ProdutoService,
    private tokenService: TokenService
    
    ) { }

  ngOnInit():void {
    this.carregarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  carregarProductos(): void {
    this.produtoService.lista().subscribe(
      data => {
        this.produtos = data;
      },
      err => {
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

}
