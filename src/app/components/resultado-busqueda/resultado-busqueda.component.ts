import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  resultadoBusqueda = [{
    cantidad_productos: [20, 100, 6],
    nombre_productos: ["Cascos", "Aceite 125", "Arroz"],
    precio_productos: [30000, 1200, 7000],
    search: "Aceite"
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
