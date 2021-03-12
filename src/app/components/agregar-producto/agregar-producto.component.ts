import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  form:FormGroup;
  reader = new FileReader();
  public showCurrentImg: boolean = false;
  public imageCurrent: any;
  private server: string = 'http://localhost:5000';
  private token: string = localStorage.getItem('token');
  public showLoad = false;

  constructor(
    private fb: FormBuilder,
    private Toastr: ToastrService,
    private client: ClienteService,
    private route: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      cantidad_producto: ['', Validators.required],
      img_producto: ['', Validators.required],
    });
  }

  Validar(){
    if (this.form.valid) {
      console.log("Form valid!")
      this.showLoad = true;
      let data = {
        nombre_producto: this.form.value.nombre_producto,
        descripcion_producto: this.form.value.descripcion_producto,
        precio_producto: this.form.value.precio_producto,
        cantidad_producto: this.form.value.cantidad_producto,
        img_producto: this.imageCurrent
      }
      this.client.postRequest(`${this.server}/api/v01/add/product`, data, this.token)
      .subscribe(
        (response: any) => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto registrado',
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            this.route.navigate(['/tusproductos'])
          });
          console.log(response);
          this.showLoad = false;

        },
        (error) => {
          console.error(error);
          this.showLoad = false;
          this.Toastr.error(`Revisa tu conexión a internet`, `Error de conexión`,{closeButton: false,extendedTimeOut: 2500})

        }

      )

    }else{
      console.log(this.form.status);

      console.log("Form Invalid!");
      this.Toastr.error(`Por favor completa todos los campos para agregar el  producto`, ``,{closeButton: false,extendedTimeOut: 2500})
    }
  }

  log(event, imgCurrent, opt){
    try {
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
    this.reader.readAsDataURL(event.target.files[0]);
    this.reader.onload =  () => {
      imgCurrent.src = this.reader.result;
      this.imageCurrent = this.reader.result;
    }
    console.log(opt.files);
    this.showCurrentImg = true;

      }else{
        console.log(`Type file: ${event.target.files[0].type}`);
        this.Toastr.info(`Selecciona una imagen`, `Imagen no válida`,{
              closeButton: false,
              extendedTimeOut: 2500
            })
          console.log("ERROR TYPE");
          this.showCurrentImg = false;
          this.imageCurrent = '';
      }
    } catch (error) {
      console.log("ERROR E:");
      console.log(opt.files.length);
      this.imageCurrent = '';

      this.Toastr.info(`Selecciona una imagen`, `Imagen no válida`,{
              closeButton: false,
              extendedTimeOut: 2500
            })
          this.showCurrentImg = false;
    }

  }

}
