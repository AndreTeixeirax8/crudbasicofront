import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { LoginUsuarioDto } from 'src/app/models/login-usuario.dto';
import { NovoUsuarioDto } from 'src/app/models/novo-usuario.dto';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  usuario: NovoUsuarioDto = {} as NovoUsuarioDto;

  name?:string;
  userName?: string;
  email?:string;
  password?:string;

  constructor(
    private authService:AuthService,
    private toastrService: ToastrService,
    private router: Router,
  ){}

  ngOnInit(): void {
    
  }

  onRegister():void{
     // Verifica se todas as variáveis têm valores definidos
  if (this.name !== undefined && this.userName !== undefined && this.email !== undefined && this.password !== undefined) {
    // Crie um objeto NovoUsuarioDto com os dados fornecidos pelo usuário
    this.usuario = new NovoUsuarioDto(this.name, this.userName, this.email, this.password);
  }
  this.authService.registro(this.usuario).subscribe(
    data =>{
      this.toastrService.success(data.message, 'OK', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      this.router.navigate(['/login']);
    },
    err => {
      this.toastrService.error(err.error.message, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }
  )
}

}
