import { Component, OnInit } from '@angular/core';
import { ChartjsCreateService } from '../services/chartjs-create.service';

@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.css']
})
export class GestionarProductosComponent implements OnInit {

  public showSpinners: boolean = true;
  private dataChart: object = {
  labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
  datasets: [
    // {
    //   type: "line",
    //   label: "Dataset 1",
    //   borderColor: this.Chart.colorExample.blue,
    //   borderWidth: 2,
    //   fill: false,
    //   data: [100, 200, 300, 150, 350, 100, 400],
    // },
    {
      type: "bar",
      label: "Ventas",
      backgroundColor: this.Chart.colorExample.red,
      data: [160, 200, 300, 150, 350, 170, 400],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Capital obtenido",
      backgroundColor: this.Chart.colorExample.green,
      data: [150, 200, 300, 150, 350, 140, 400],
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};
  constructor(
    private Chart: ChartjsCreateService) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinners = false;
    }, 3000);

    setTimeout(() => {
      this.Chart.init('chart1', this.dataChart, 'Reporte semanal', 'bar');
    }, 3100);

  }

}
