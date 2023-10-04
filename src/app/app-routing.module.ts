import { ProdutoGuard } from './guards/produto.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './produto/lista-produto.component';
import { DetalleProductoComponent } from './produto/detalhe-produto.component';
import { NovoProdutoComponent } from './produto/novo-produto.component';
import { EditarProductoComponent } from './produto/editar-produto.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalheUsuarioComponent } from './usuario/detalhe-usuario.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lista', component: ListaProductoComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin', 'user']}},
  {path: 'nuevo', component: NovoProdutoComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin']}},
  {path: 'editar/:id', component: EditarProductoComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin']}},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
  {path: 'usuario', component: ListaUsuarioComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle/user/:id', component: DetalheUsuarioComponent, canActivate: [ProdutoGuard], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
