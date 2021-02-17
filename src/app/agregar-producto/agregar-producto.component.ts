import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  form:FormGroup;
  reader = new FileReader();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      referencia: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }
  Validar(){
    if (this.form.valid) {
      console.log("Form valid!")
      let data = {
        correo: this.form.value.correo,
        password: this.form.value.password
      }
    }else{
      console.log("Form Invalid!");
    }
  }

  log(event, imgCurrent){
    try {
      if (event.type == "image/jpeg" || event.type == "image/png") {
    this.reader.readAsDataURL(event);
    this.reader.onload =  () => {
      imgCurrent.src = this.reader.result;
    }
      }else{
        console.log(`Type file: ${event.type}`);

      }

    } catch (error) {
      console.error("Error when change img")
    }

  }

}
