import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService} from '../services/cliente.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClienteService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  load: boolean = false;
  logueado: boolean = false;

  async Validar(){
    if (this.form.valid) {
      this.load = true
      let data = {
        correo: this.form.value.correo,
        password: this.form.value.password
      }
      this.client.postRequest('http://localhost:5000/api/v01/user/login', data).subscribe(

        (response: any) => {
          console.log(response);
          this.load = false;
          if (response.logueado) {
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logueado correctamente',
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            this.route.navigate( ['/home'])
          });

          }else{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos incorrectos',
            showConfirmButton: false,
            timer: 2000
          })
          }

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
