import { Component, OnInit } from '@angular/core';
import { InfoProductService } from 'src/app/services/info-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { JpPreloadService, ElementConfig } from '@jaspero/ng-image-preload';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-info-producto',
    templateUrl: './info-producto.component.html',
    styleUrls: ['./info-producto.component.css'],
})
export class InfoProductoComponent implements OnInit {
    constructor(
        public infoProduct: InfoProductService,
        private location: Location,
        private preload: JpPreloadService,
        private _client: ClienteService,
        private fb: FormBuilder,
        private _Router: Router,
        public Toastr: ToastrService
    ) { }

    private _server: string = this._client._server;
    public load: boolean = false;
    public requestForm: FormGroup;
    public imgLoadingR: string =
        'http://cdn.lowgif.com/medium/62278b467b869a3c-.gif';
    public imagen_producto: string = this.infoProduct.imagen_producto;
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
        this.requestForm = this.fb.group({
            quantity: ['', Validators.required]
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

    requestProduct() {
        if (this.requestForm.valid) {
            this.load = true;
            this._client.getRequest(`${this._server}/api/v01/request/products/${this.xInfoProduct.id_producto}/${this.requestForm.value.quantity}/`, localStorage.getItem('token')).subscribe(
                (res: any) => {
                    if (res.bought) {
                        Swal.fire({
                            position: 'top-right',
                            icon: 'success',
                            title: 'Producto solicitado!',
                            showConfirmButton: false,
                            timer: 2000
                        }).then((result) => {
                            this._Router.navigate(['/gestionarproductos'])
                        });
                    } else {
                        Swal.fire({
                            position: 'top-right',
                            icon: 'error',
                            title: 'No se pudo solicitar el producto!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                    this.load = false;
                },
                (error: any) => {
                    this.Toastr.error(`Revisa tu conexión a internet`, `Error`, {
                        closeButton: false,
                        extendedTimeOut: 2500
                    })
                    this.load = false;
                }
            )
        } else {
            Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Selecciona las unidades del producto a solicitar!',
                showConfirmButton: false,
                timer: 2000
            });
        }

    }
    onBack() {
        this.location.back();
    }
}
