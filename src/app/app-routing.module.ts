import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ChatComponent } from './chat/chat.component';
import { InfoProductoComponent } from './info-producto/info-producto.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { SeccionPrincipalComponent } from './seccion-principal/seccion-principal.component';

const routes: Routes = [
  {path: '', component:LoginComponent },
  {path: 'registro' , component:RegistroComponent },
  {path: 'login' , component:LoginComponent },
  {path: 'home', component:SeccionPrincipalComponent},
  {path: 'search', component: ResultadoBusquedaComponent},
  {path: 'infoproducto', component: InfoProductoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'agregarproducto', component: AgregarProductoComponent},
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
