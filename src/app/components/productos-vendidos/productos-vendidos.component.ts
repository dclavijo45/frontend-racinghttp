import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthBehaviorSubjectService } from 'src/app/services/auth-behavior-subject.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UpdateProductService } from 'src/app/services/update-product.service';
import Swal from 'sweetalert2';
import { JpPreloadService, ElementConfig } from '@jaspero/ng-image-preload';
import { InfoProductService } from 'src/app/services/info-product.service';

@Component({
    selector: 'app-productos-vendidos',
    templateUrl: './productos-vendidos.component.html',
    styleUrls: ['./productos-vendidos.component.css']
})
export class ProductosVendidosComponent implements OnInit {

    public status: boolean;
    private token: string = localStorage.getItem('token');
    private server: string = this.client._server;
    // public listProductSelected: any[] = [];
    public spinnersShow: any = {
        loadingProducts: true
    };
    public inputSearch: string = '';
    public filterSearch: any[] = [];
    public notResultSearch: boolean = false;
    public listP: any[] = [];
    public infoProduct: any;

    constructor(
        private client: ClienteService,
        private updateP: UpdateProductService,
        private router: Router,
        private auth: AuthBehaviorSubjectService,
        private preload: JpPreloadService,
        private infoProductS: InfoProductService
    ) { }
    public imgLoadingR: string = this.infoProductS.imgLoadingR;

    ngOnInit(): void {
        this.client
            .getRequest(`${this.server}/api/v01/purchased/products/${this.token}/vendedor/`)
            .subscribe((res: any) => {
                this.listP = res;
                try {
                    this.infoProduct = {
                        id: this.listP[0].id_registro,
                        img_product: this.listP[this.listP.length - 1].imagen_producto,
                        price_product: this.listP[this.listP.length - 1].precio_producto,
                        name_product: this.listP[this.listP.length - 1].nombre_producto,
                        description_product: this.listP[this.listP.length - 1]
                            .descripcion_producto,
                    };
                    this.spinnersShow.loadingProducts = false;
                } catch (error) {
                    this.infoProduct = {
                        id: 0,
                        img_product: '',
                        price_product: 0,
                        name_product: '',
                        description_product: '',
                    };
                    this.spinnersShow.loadingProducts = false;
                }
            });
        this.preload.initialize();
    }

    ngOnDestroy(): void { }

    addImage(element: HTMLElement, config: ElementConfig) {
        this.preload.addImage(element, config);
    }

    // delFromListP(item) {
    //     this.listProductSelected = this.listProductSelected.filter(
    //         (e) => e !== item
    //     );
    // }

    // clickp(idProduct) {
    //     if (!this.listProductSelected.includes(idProduct)) {
    //         this.listProductSelected.push(idProduct);
    //         console.log(this.listProductSelected);
    //     } else {
    //         this.delFromListP(idProduct);
    //         console.log(this.listProductSelected);
    //     }
    // }

    searchProduct(dataF: string) {
        let dataFilter = dataF.toLowerCase()
        this.filterSearch = [];
        this.listP.forEach((data) => {
            if (
                data.nombre_producto.toLowerCase().includes(dataFilter) ||
                data.precio_producto.toString().toLowerCase().includes(dataFilter) ||
                data.fecha_compra.toLowerCase().includes(dataFilter) ||
                data.vendedor_producto.toString().toLowerCase().includes(dataFilter) ||
                data.volumen_adquirido.toString().toLowerCase().includes(dataFilter)
            ) {
                this.filterSearch.push(data);
            }
        });
        this.filterSearch.length == 0
            ? (this.notResultSearch = true)
            : (this.notResultSearch = false);
    }

    clickToP(id) {
        //this.auth.validateJwt()
        this.listP.some((data) => {
            if (data.id_registro.toString().includes(id)) {
                this.infoProduct.img_product = data.imagen_producto;
                this.infoProduct.price_product = data.precio_producto;
                this.infoProduct.name_product = data.nombre_producto;
                return (this.infoProduct.description_product =
                    data.descripcion_producto);
            }
        });
    }

}
