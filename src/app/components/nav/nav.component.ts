import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoProductService } from 'src/app/services/info-product.service';
import { AuthBehaviorSubjectService } from '../../services/auth-behavior-subject.service';
import { ClienteService } from '../../services/cliente.service';
import { JpPreloadService, ElementConfig } from '@jaspero/ng-image-preload';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private client: ClienteService,
    public auth: AuthBehaviorSubjectService,
    public infoProduct: InfoProductService,
    private route: Router,
    private preload: JpPreloadService
  ) {}

  public inputSearch: string = '';
  public inputSearchFocused: boolean = false;
  private server: string = this.client._server;
  public loading: boolean = false;
  public notFoundResults: boolean = false;
  public resultSearch: any[] = [];
  private _token: string;
  public imgLoadingR: string = this.infoProduct.imgLoadingR;

  ngOnInit(): void {
    try {
      this._token = localStorage.getItem('token');
    } catch (e) {
      console.log(`Not found token`);
    }
    this.preload.initialize();
  }

  addImage(element: HTMLElement, config: ElementConfig) {
    this.preload.addImage(element, config);
  }

  async Buscar(key) {
    if (
      this.inputSearch.length == 0 ||
      this._token.length == 0 ||
      key.length == 0
    )
      return false;

    this.resultSearch = [];
    this.loading = true;
    this.notFoundResults = false;

    let data = {
      search_key: this.inputSearch,
    };

    this.client
      .postRequest(`${this.server}/api/v01/search/product`, data, this._token)
      .subscribe(
        (response: any) => {
          if (response[0].found) {
            this.notFoundResults = false;
            this.resultSearch = response;
          } else {
            this.notFoundResults = true;
          }
          console.log(response);
          this.loading = false;
        },
        (error) => {
          console.log(error.status);
          this.loading = false;
          this.notFoundResults = true;
        }
      );
  }

  logout() {
    this.auth.logout();
  }

  clickProductList(id) {
    this.resultSearch.some((data) => {
      if (data.id_producto.toString().includes(id)) {
        this.infoProduct.resetInfoProduct();
        this.inputSearch = '';
        this.infoProduct.nombre_producto = data.nombre_producto;
        this.infoProduct.vendedor_producto = data.usuario_creador;
        this.infoProduct.descripcion_producto = data.descripcion_producto;
        this.infoProduct.id_producto = data.id_producto;
        this.infoProduct.precio_producto = data.precio_producto;
        this.infoProduct.unidades_producto = data.cantidad_producto;
        this.infoProduct.imagen_producto = data.imagen_producto;
        this.infoProduct.showing = true;
        console.log(this.infoProduct.imagen_producto);
        this.infoProduct.refresh();

        return this.route.navigate(['/infoproducto']);
      }
    });
    // if (this.infoProduct.showing) this.route.navigate(['/infoproducto']);
  }

  hideResults() {
    setTimeout(() => {
      this.inputSearchFocused = false;
      this.inputSearch = '';
    }, 400);
  }
}
