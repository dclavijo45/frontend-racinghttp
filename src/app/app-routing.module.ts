import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizarPerfilComponent } from './components/actualizar-perfil/actualizar-perfil.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ChatComponent } from './components/chat/chat.component';
import { VerListaTusProductosComponent } from './components/ver-lista-tus-productos/ver-lista-tus-productos.component';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { AddproductGuardGuard } from './guardians/addproduct-guard.guard';
import { ChatGuardGuard } from './guardians/chat-guard.guard';
import { HomeGuardGuard } from './guardians/home-guard.guard';
import { ManageProductGuard } from './guardians/manage-product.guard';
import { VerListaTusProductosGuard } from './guardians/ver-lista-tus-productos.guard';
import { InfoProductoComponent } from './components/info-producto/info-producto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { SeccionPrincipalComponent } from './components/seccion-principal/seccion-principal.component';
import { UpdateProductGuard } from './guardians/update-product.guard';

const routes: Routes = [
  {path: '', component:LoginComponent },
  {path: 'registro' , component:RegistroComponent },
  {path: 'login' , component:LoginComponent },
  {path: 'home', component:SeccionPrincipalComponent, canActivate: [HomeGuardGuard]},
  {path: 'search', component: ResultadoBusquedaComponent},
  {path: 'infoproducto', component: InfoProductoComponent},
  {path: 'chat', component: ChatComponent, canActivate: [ChatGuardGuard]},
  {path: 'carrito', component: CarritoComponent},
  {path: 'gestionarproductos', component: GestionarProductosComponent, canActivate: [ManageProductGuard]},
  {path: 'agregarproducto', component: AgregarProductoComponent, canActivate: [AddproductGuardGuard]},
  {path: 'actualizarproducto', component: ActualizarProductoComponent, canActivate: [UpdateProductGuard]},
  {path: 'actualizarperfil', component: ActualizarPerfilComponent},
  {path: 'tusproductos', component: VerListaTusProductosComponent, canActivate: [VerListaTusProductosGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
