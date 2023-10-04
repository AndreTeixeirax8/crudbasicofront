import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {

   producto: Producto | undefined;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit():void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver()
      }
    );
  }


  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    
    if (this.producto) {
      this.productoService.update(id, this.producto).subscribe(
        data => {
          this.toastr.success('Producto Actualizado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.volver()
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

  
  volver(): void {
    this.router.navigate(['/lista']);
  }

  
  
  

}