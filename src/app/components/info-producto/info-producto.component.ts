import { Component, OnInit } from '@angular/core';
import { InfoProductService } from 'src/app/services/info-product.service';
import { Location } from '@angular/common';
import { JpPreloadService, ElementConfig } from '@jaspero/ng-image-preload';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css'],
})
export class InfoProductoComponent implements OnInit {
  constructor(
    public infoProduct: InfoProductService,
    private location: Location,
    private preload: JpPreloadService
  ) {}

  public imgLoadingR: string =
    'http://cdn.lowgif.com/medium/62278b467b869a3c-.gif';
  public imagen_producto = this.infoProduct.imagen_producto;
  public xInfoProduct = {
    showing: this.infoProduct.showing,
    nombre_producto: this.infoProduct.nombre_producto,
    vendedor_producto: this.infoProduct.vendedor_producto,
    precio_producto: this.infoProduct.precio_producto,
    descripcion_producto: this.infoProduct.descripcion_producto,
    unidades_producto: this.infoProduct.unidades_producto,

    id_producto: this.infoProduct.id_producto,
  };

  ngOnInit(): void {
    this.infoProduct.foundProduct().subscribe((find) => {
      if (find) this.refresh();
    });
    this.preload.initialize();
  }

  ngOnDestroy(): void {
    this.infoProduct.resetInfoProduct();
  }

  addImage(element: HTMLElement, config: ElementConfig) {
    this.preload.addImage(element, config);
  }

  refresh() {
    this.xInfoProduct = {
      showing: this.infoProduct.showing,
      nombre_producto: this.infoProduct.nombre_producto,
      vendedor_producto: this.infoProduct.vendedor_producto,
      precio_producto: this.infoProduct.precio_producto,
      descripcion_producto: this.infoProduct.descripcion_producto,
      unidades_producto: this.infoProduct.unidades_producto,
      id_producto: this.infoProduct.id_producto,
    };
    this.imagen_producto = this.infoProduct.imagen_producto;
  }

  onBack() {
    this.location.back();
  }
}
