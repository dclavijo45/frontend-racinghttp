import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seccion-principal',
  templateUrl: './seccion-principal.component.html',
  styleUrls: ['./seccion-principal.component.css']
})
export class SeccionPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  resultadoB: boolean = false;

  mostrarEvento(event){
    alert("Evento recibido!")

  }
}
