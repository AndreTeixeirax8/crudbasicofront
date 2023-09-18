import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { LoginUsuarioDto } from 'src/app/models/login-usuario.dto';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuarioDto = {} as LoginUsuarioDto ;

  userName?: string;
  password?:string;

  constructor (
    private authService:AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router,
  ){}

  ngOnInit(): void {

  }

  onLogin(): void {
    if (this.userName !== undefined && this.password !== undefined) {
      this.usuario = new LoginUsuarioDto(this.userName, this.password);
      this.authService.login(this.usuario).subscribe(
        data => {
          console.log(data.token)
          if(!data.token){
            this.toastrService.error(data.response.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }else{
            this.tokenService.setToken(data.token);
          }
          
        },   err => {
          this.toastrService.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    } else {
      // Lida com o caso em que userName ou password são undefined
      console.error("userName e/ou password não definidos");
    }
  }
 


}
