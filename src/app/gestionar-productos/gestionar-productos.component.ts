import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { ObservableCreateChartService } from '../services/observableCreateChart.service';
import {CreateChartService} from '../services/create-chart.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.css']
})
export class GestionarProductosComponent implements OnInit {

  public showSpinners: boolean = true;
  private token: string = localStorage.getItem('token')
  public myPurchasedPro: number;
  private server: string = 'http://localhost:5000';
  public myProducts: number = 0;
  public res:any;
  public chartClicked = this.createChart.chartClicked;
  public chartHovered = this.createChart.chartHovered;
  public chart1Info: any = {
    data: [{ data: [0, 0, 0, 0, 0, 0, 0], label: 'Ventas' }],
    label: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
    options: {
      responsive: true
    },
    colors: [{
      backgroundColor: this.createChart.colorExample.green,
      borderColor: this.createChart.colorExample.red
    }],
    legend: true,
    type: 'bar',
    plugins: []
  }
  public chart2Info: any = {
    data: [{ data: [0, 0, 0, 0, 0, 0, 0], label: 'Ganancias' }],
    label: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
    options: {
      responsive: true
    },
    colors: [{
      backgroundColor: this.createChart.colorExample.red,
      borderColor: this.createChart.colorExample.yellow
    }],
    legend: true,
    type: 'bar',
    plugins: []
  }

  constructor(
    private client: ClienteService,
    private observableCreateChart: ObservableCreateChartService,
    private createChart: CreateChartService
    ) { }

  ngOnInit(): void {

    this.createChart.createChart(this.chart1Info.data, this.chart1Info.label, this.chart1Info.options, this.chart1Info.colors, this.chart1Info.legend, this.chart1Info.type, this.chart1Info.plugins)

    this.observableCreateChart.promiseTest(this.token).then((res:any)=>{
      console.log(res);
      this.chart1Info.data[0].data = res.chart_1;
      this.chart2Info.data[0].data = res.chart_2;
    })

    // setTimeout(() => {
    //   this.showSpinners = false;
    // }, 3000);

    // setTimeout(() => {
    //   this.Chart.init('chart1', this.dataChart, 'Reporte semanal', 'bar');
    //   this.Chart.init('chart2', this.dataChart2, 'Reporte semanal', 'bar');
    // }, 3100);
  }

  random(){
    let data = []
    for (let i = 0; i < 8; i++) {
      data.push(Math.round(Math.random()*100))
    }
    this.chart1Info.data[0].data = data;

  }

}

