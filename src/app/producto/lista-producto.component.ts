import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent {

  productos: Producto[] = [];
  listaVacia =undefined;
  isAdmin?:boolean;

  constructor(
    private productoService: ProductoService,
    private tokenService: TokenService
    //private toastr: ToastrService
    ) { }

  ngOnInit():void {
    this.carregarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  carregarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
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
    this.productoService.delete(id).subscribe(res => this.carregarProductos())
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
