import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService} from '../../services/cliente.service';
import Swal from 'sweetalert2';
// import Swal from 'src/app/components/login/node_modules/src/app/components/gestionar-productos/node_modules/src/app/components/agregar-producto/node_modules/sweetalert2/dist/sweetalert2.js.js.js.js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  load:boolean = false;
  private server: string = this.client._server;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClienteService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      documento: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async Registrar(){
    if (this.form.valid) {

      let data = {
        nombres: this.form.value.nombres,
        documento: this.form.value.documento,
        correo: this.form.value.correo,
        password: this.form.value.password,
      }
      this.load = true;
      this.client.postRequest(`${this.server}/api/v01/user/register`, data).subscribe(

        (response: any) => {
          this.load = true;
          console.log(response);

          if (response.usuarioRegistrado) {
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            this.route.navigate( ['/login'])
          });

          }else{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se ha registrado',
            showConfirmButton: false,
            timer: 2000
          })
          }
          this.load = false;
      },
      (error) => {
        //this.load = true;

        console.log(error.status);

      })


    } else {

      console.log("Form error");
    }

  }
}
