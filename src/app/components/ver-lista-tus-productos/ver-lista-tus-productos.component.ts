import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthBehaviorSubjectService } from 'src/app/services/auth-behavior-subject.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UpdateProductService } from 'src/app/services/update-product.service';
import Swal from 'sweetalert2';
import { JpPreloadService, ElementConfig } from '@jaspero/ng-image-preload';
import { InfoProductService } from 'src/app/services/info-product.service';

@Component({
  selector: 'app-ver-lista-tus-productos',
  templateUrl: './ver-lista-tus-productos.component.html',
  styleUrls: ['./ver-lista-tus-productos.component.css'],
})
export class VerListaTusProductosComponent implements OnInit {
  public status: boolean;
  private token: string = localStorage.getItem('token');
  private server: string = this.client._server;
  public listProductSelected: any[] = [];
  public spinnersShow: any = {
    loadingProducts: true,
    deleting: false,
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
  ) {}
  public imgLoadingR: string = this.infoProductS.imgLoadingR;

  ngOnInit(): void {
    this.client
      .postRequest(`${this.server}/api/v01/manage/myproducts`, {}, this.token)
      .subscribe((res: any) => {
        this.listP = res;
        try {
          this.infoProduct = {
            id: this.listP[0].id,
            img_product: this.listP[this.listP.length - 1].img_product,
            price_product: this.listP[this.listP.length - 1].price_product,
            name_product: this.listP[this.listP.length - 1].name_product,
            description_product: this.listP[this.listP.length - 1]
              .description_product,
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

  ngOnDestroy(): void {}

  addImage(element: HTMLElement, config: ElementConfig) {
    this.preload.addImage(element, config);
  }

  delFromListP(item) {
    this.listProductSelected = this.listProductSelected.filter(
      (e) => e !== item
    );
  }

  clickp(idProduct) {
    if (!this.listProductSelected.includes(idProduct)) {
      this.listProductSelected.push(idProduct);
      console.log(this.listProductSelected);
    } else {
      this.delFromListP(idProduct);
      console.log(this.listProductSelected);
    }
  }

  delProduct() {
    if (this.listProductSelected.length == 0) return false;
    Swal.fire({
      title: '¿Seguro que quiere borrar lo seleccionado?',
      text: 'No se podrá revertir esta operación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnersShow.deleting = true;
        this.client
          .postRequest(
            `${this.server}/api/v01/manage/myproducts/delete`,
            { product_id: this.listProductSelected },
            this.token
          )
          .subscribe(
            (response: any) => {
              if (response.deleted) {
                this.listProductSelected = [];
                this.client
                  .postRequest(
                    `${this.server}/api/v01/manage/myproducts`,
                    {},
                    this.token
                  )
                  .subscribe(
                    (res: any) => {
                      this.spinnersShow.deleting = false;
                      Swal.fire({
                        position: 'top-right',
                        icon: 'success',
                        title: 'Producto borrado',
                        showConfirmButton: false,
                        timer: 1500,
                      }).then((result) => {
                        this.listP = res;
                        try {
                          this.infoProduct = {
                            id: this.listP[0].id,
                            img_product: this.listP[0].img_product,
                            price_product: this.listP[0].price_product,
                            name_product: this.listP[0].name_product,
                            description_product: this.listP[0]
                              .description_product,
                          };
                        } catch (error) {
                          this.infoProduct = {
                            id: 0,
                            img_product: '',
                            price_product: 0,
                            name_product: '',
                            description_product: '',
                          };
                        }
                      });
                    },
                    (error) => {
                      this.spinnersShow.deleting = false;
                      Swal.fire({
                        position: 'top-right',
                        icon: 'error',
                        title: 'Verifique su conexión a internet',
                        showConfirmButton: false,
                        timer: 1500,
                      }).then((result) => {});
                    }
                  );
              } else {
                console.log(response);

                this.spinnersShow.deleting = false;
                Swal.fire({
                  position: 'top-right',
                  icon: 'error',
                  title: 'Producto no borrado',
                  showConfirmButton: false,
                  timer: 1500,
                }).then((result) => {});
              }
            },
            (error) => {
              console.error('ERROR');
              this.spinnersShow.deleting = false;
            }
          );
      }
    });
  }

  editProduct() {
    if (this.listProductSelected.length != 1) return false;
    this.listP.some((data) => {
      if (data.id.toString().includes(this.listProductSelected[0].toString())) {
        this.updateP.product_img = data.img_product;
        this.updateP.product_name = data.name_product;
        this.updateP.product_size = data.vol_product;
        this.updateP.product_description = data.description_product;
        this.updateP.product_price = data.price_product;
        this.updateP.product_id = data.id;
        return this.router.navigate(['/actualizarproducto']);
      }
    });
  }

  searchProduct(dataFilter) {
    this.filterSearch = [];
    this.listP.forEach((data) => {
      if (
        data.name_product.includes(dataFilter) ||
        data.price_product.toString().includes(dataFilter) ||
        data.vol_product.toString().includes(dataFilter)
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
      if (data.id.toString().includes(id)) {
        this.infoProduct.img_product = data.img_product;
        this.infoProduct.price_product = data.price_product;
        this.infoProduct.name_product = data.name_product;
        return (this.infoProduct.description_product =
          data.description_product);
      }
    });
  }
}
