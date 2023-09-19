import { Component,OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged?: boolean;

  constructor(
    private tokenService:TokenService,
    private router: Router,
  ){}

  ngOnInit():void{

    this.tokenService.isLogged() ? this.isLogged = true : this.isLogged =false;

  }

  logOut():void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

}
