import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaProductoComponent } from './produto/lista-produto.component';
import { NovoProdutoComponent } from './produto/novo-produto.component';
import { EditarProductoComponent } from './produto/editar-produto.component';
import { DetalheProdutoComponent } from './produto/detalhe-produto.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { interceptorProvider } from './interceptors/produto.interceptor';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalheUsuarioComponent } from './usuario/detalhe-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    NovoProdutoComponent,
    EditarProductoComponent,
    DetalheProdutoComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    ListaUsuarioComponent,
    DetalheUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
