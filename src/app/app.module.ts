import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SeccionPrincipalComponent } from './seccion-principal/seccion-principal.component';
import { ModalComponent } from './modal/modal.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { InfoProductoComponent } from './info-producto/info-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    SeccionPrincipalComponent,
    ModalComponent,
    ResultadoBusquedaComponent,
    InfoProductoComponent,
    CarritoComponent,
    AgregarProductoComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
