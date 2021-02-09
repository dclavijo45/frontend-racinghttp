import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService} from '../services/cliente.service';

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
  async Validar(){
    if (this.form.valid) {

      let data = {
        correo: this.form.value.correo,
        password: this.form.value.password
      }
      this.client.postRequest('http://localhost:5000/api/v01/user/login', data).subscribe(

        (response: any) => {
          console.log(response);
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
