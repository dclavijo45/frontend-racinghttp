import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeccionPrincipalComponent } from './components/seccion-principal/seccion-principal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { InfoProductoComponent } from './components/info-producto/info-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ChatComponent } from './components/chat/chat.component';
import { ActualizarPerfilComponent } from './components/actualizar-perfil/actualizar-perfil.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { VerListaTusProductosComponent } from './components/ver-lista-tus-productos/ver-lista-tus-productos.component';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { LoadingImgDirective } from './directives/loading-img.directive';
import { JpImagePreloadModule } from '@jaspero/ng-image-preload';

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
    ChatComponent,
    ActualizarPerfilComponent,
    ActualizarProductoComponent,
    GestionarProductosComponent,
    VerListaTusProductosComponent,
    LoadingImgDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 2500,
      extendedTimeOut: 1000,
    }),
    ChartsModule,
    DataTablesModule,
    JpImagePreloadModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
