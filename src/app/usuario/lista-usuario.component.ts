import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TokenService } from '../token.service';
import { Usuario } from '../models';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent {

  usuarios: Usuario[] = [];
  listaVacia =undefined;
  isAdmin?:boolean;

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService
    //private toastr: ToastrService
    ) { }

  ngOnInit():void {
    this.carregarUsuarios();
    this.isAdmin = this.tokenService.isAdmin();
  }

  carregarUsuarios(): void {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );
  }
/*
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
  }*/

}
