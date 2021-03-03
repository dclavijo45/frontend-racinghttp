import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizarPerfilComponent } from './actualizar-perfil/actualizar-perfil.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ChatComponent } from './chat/chat.component';
import { GestionarProductosComponent } from './gestionar-productos/gestionar-productos.component';
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
  {path: 'chat', component: ChatComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'gestionarproductos', component: GestionarProductosComponent},
  {path: 'agregarproducto', component: AgregarProductoComponent},
  {path: 'actualizarproducto', component: ActualizarProductoComponent},
  {path: 'actualizarperfil', component: ActualizarPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
