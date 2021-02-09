import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService} from '../services/cliente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  form: FormGroup;
  load:boolean = true;
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
      this.load = false;
      this.client.postRequest('http://localhost:5000/api/v01/user/register', data).subscribe(

        (response: any) => {
          this.load = true;
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
