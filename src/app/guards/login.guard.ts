import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.isLogged()) {
      return true; // O usuário não está autenticado, permita o acesso à rota.
    }
    
    this.router.navigate(['/']); // O usuário já está autenticado, redirecione para a página inicial.
    return false;
  }
}