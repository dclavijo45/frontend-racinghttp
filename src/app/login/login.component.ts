import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import * as jwt_decode from 'jwt-decode';
import { AuthBehaviorSubjectService } from '../services/auth-behavior-subject.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  public server: string = 'http://localhost:5000';
  formRegister: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClienteService,
    public auth: AuthBehaviorSubjectService,
    public Toastr: ToastrService) { }
    public showSignInSignUp: boolean = true;
    jwt_decode = jwt_decode;

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      //this.route.navigate(['/home'])
      this.auth.logout();
    }
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      position: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  load: boolean = false;
  logueado: boolean = false;

  async Login(){
    if (this.form.valid) {
      this.load = true
      let data = {
        email: this.form.value.correo,
        password: this.form.value.password
      }
      this.client.postRequest(`${this.server}/api/v01/user/login`, data, localStorage.getItem("token")).subscribe(

        (response: any) => {
          console.log(response);
          this.load = false;
          if (response.logueado) {
            localStorage.setItem('user_info', {
              email: response.email,
              name: response.name,
              lastname: response.lastname,
              position: response.position,
              private_key: response.private_key
            }.toString())
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Logueado correctamente',
              showConfirmButton: false,
              timer: 2000
              }).then((result) => {
                this.auth.login(response.token)
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
        this.load = false;
        console.log(error.status);
        Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'Verifique su conexión a internet',
            showConfirmButton: false,
            timer: 3000
          })
      })


    } else {
      console.error("Form error");
      Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'Rellene todos los campos para iniciar sesión',
            showConfirmButton: false,
            timer: 2000
          })
    }

  }

  async Register(){
    if (this.formRegister.valid) {
      this.load = true
      let data = {
        email: this.formRegister.value.email,
        password: this.formRegister.value.password,
        name: this.formRegister.value.name,
        lastname: this.formRegister.value.lastname,
        position: this.formRegister.value.position
      }
      this.client.postRequest(`${this.server}/api/v01/user/register`, data).subscribe(

        (response: any) => {
          console.log(response);
          this.load = false;
          if (response.registered) {
            localStorage.setItem('user_info', {
              email: response.email,
              name: response.name,
              lastname: response.lastname,
              position: response.position,
              private_key: response.private_key
            }.toString())
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            this.showSignInSignUp = true;
          });

          }else{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ingresa tus datos correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          }

      },
      (error) => {
        this.load = false;
        console.log(error.status);
        Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'Verifique su conexión a internet',
            showConfirmButton: false,
            timer: 3000
          })
      })


    } else {
      console.error("form error");
      Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'Rellene todos los campos para poder registrarse',
            showConfirmButton: false,
            timer: 3000
          })
    }

  }

  changeSignInSignUp(){
    this.showSignInSignUp = !this.showSignInSignUp;
  }
}
