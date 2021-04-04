import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoProductService {
  constructor() {}

  public showing: boolean = false;
  public nombre_producto: string = '';
  public vendedor_producto: string = '';
  public precio_producto: number = 0;
  public descripcion_producto: string = '';
  public imagen_producto: string = '';
  public unidades_producto: number = 0;
  public id_producto: number = -1;
  public imgLoadingR: string = 'https://sbay.in/assets/images/status.gif';

  findProduct = new BehaviorSubject<boolean>(this.checkProduct());

  checkProduct() {
    return this.showing;
  }

  refresh() {
    this.showing ? this.findProduct.next(true) : this.findProduct.next(false);
  }

  foundProduct(): Observable<boolean> {
    return this.findProduct.asObservable();
  }

  resetInfoProduct() {
    this.showing = false;
    this.nombre_producto = '';
    this.vendedor_producto = '';
    this.imagen_producto = '';
    this.precio_producto = 0;
    this.descripcion_producto = '';
    this.unidades_producto = 0;
    this.id_producto = -1;
  }
}
