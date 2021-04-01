import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { UpdateProductService } from 'src/app/services/update-product.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
})
export class ActualizarProductoComponent implements OnInit {
  form: FormGroup;
  reader = new FileReader();
  public showCurrentImg: boolean = false;

  private server: string = this.client._server;
  private token: string = localStorage.getItem('token');
  public showLoad = false;
  public productInfo: any = {
    img: this.updateP.product_img,
    name: this.updateP.product_name,
    size: this.updateP.product_size,
    description: this.updateP.product_description,
    price: this.updateP.product_price,
    id: this.updateP.product_id,
  };
  public imageCurrent: any = this.updateP.product_img;

  constructor(
    private fb: FormBuilder,
    private Toastr: ToastrService,
    private client: ClienteService,
    private route: Router,
    private updateP: UpdateProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      cantidad_producto: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.updateP.product_img = undefined;
    this.updateP.product_name = undefined;
    this.updateP.product_size = 0;
    this.updateP.product_description = undefined;
    this.updateP.product_price = 0;
    this.updateP.product_id = undefined;
  }

  Validar(img) {
    if (this.form.valid) {
      let data = {
        nombre_producto: this.form.value.nombre_producto,
        descripcion_producto: this.form.value.descripcion_producto,
        precio_producto: this.form.value.precio_producto,
        cantidad_producto: this.form.value.cantidad_producto,
        img_producto: [this.productInfo.img, this.imageCurrent],
        img_changed: false,
        id_producto: this.productInfo.id,
      };
      console.log('Form valid!');
      if (img.src.slice(42) == this.productInfo.img) {
        console.log('img not ch');

        data.img_changed = false;
      } else {
        console.log('img ch');
        data.img_changed = true;
      }

      this.showLoad = true;
      console.log(data);

      this.client
        .putRequest(`${this.server}/api/v01/manage/products`, data, this.token)
        .subscribe(
          (response: any) => {
            if (response.saved) {
              Swal.fire({
                position: 'top-right',
                icon: 'success',
                title: 'Producto actualizado',
                showConfirmButton: false,
                timer: 2000,
              }).then((result) => {
                this.route.navigate(['/tusproductos']);
              });
              console.log(response);
              this.showLoad = false;
            } else {
              Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Producto no actualizado',
                showConfirmButton: false,
                timer: 2000,
              });
              console.log(response);
              this.showLoad = false;
            }
          },
          (error) => {
            console.error(error);
            this.showLoad = false;
            this.Toastr.error(
              `Revisa tu conexión a internet`,
              `Error de conexión`,
              { closeButton: false, extendedTimeOut: 2500 }
            );
          }
        );
    } else {
      console.log(this.form.status);

      console.log('Form Invalid!');
      this.Toastr.error(
        `Por favor completa todos los campos para agregar el  producto`,
        ``,
        { closeButton: false, extendedTimeOut: 2500 }
      );
    }
  }

  log(event, imgCurrent, opt) {
    try {
      if (
        event.target.files[0].type == 'image/jpeg' ||
        event.target.files[0].type == 'image/png'
      ) {
        this.reader.readAsDataURL(event.target.files[0]);
        this.reader.onload = () => {
          imgCurrent.src = this.reader.result;
          this.imageCurrent = this.reader.result;
        };
        console.log(opt.files);
        this.showCurrentImg = true;
      } else {
        console.log(`Type file: ${event.target.files[0].type}`);
        this.Toastr.info(`Selecciona una imagen`, `Imagen no válida`, {
          closeButton: false,
          extendedTimeOut: 2500,
        });
        console.log('ERROR TYPE');
        this.showCurrentImg = false;
        this.imageCurrent = '';
      }
    } catch (error) {
      console.log('ERROR E:');
      console.log(opt.files.length);
      this.imageCurrent = '';

      this.Toastr.info(`Selecciona una imagen`, `Imagen no válida`, {
        closeButton: false,
        extendedTimeOut: 2500,
      });
      this.showCurrentImg = false;
    }
  }

  regresar() {
    this.route.navigate(['/tusproductos']);
  }
}
