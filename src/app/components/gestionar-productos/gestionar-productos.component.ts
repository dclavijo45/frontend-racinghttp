import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { ObservableCreateChartService } from '../../services/observableCreateChart.service';
import {CreateChartService} from '../../services/create-chart.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Swal from 'sweetalert2';
// import  Swal  from '../src/components/node_modules/sweetalert2/dist/sweetalert2.js.js';


@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.css']
})
export class GestionarProductosComponent implements OnInit {

  public showSpinners: boolean = false;
  private token: string = localStorage.getItem('token')
  public myPurchasedPro: any = 0;
  public myProducts: any = 0;
  public money: any = 0;
  private server: string = 'http://localhost:5000';
  public result:any;
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

    this.observableCreateChart.getData(this.token).then((res:any)=>{
      this.chart1Info.data[0].data = res.chart_1;
      this.chart2Info.data[0].data = res.chart_2;
      this.showSpinners = !this.showSpinners;
    })

    this.observableCreateChart.changeData().subscribe((res:any)=>{
      if (res.error) {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          title: 'Verifique su conexión a internet',
          showConfirmButton: false,
          timer: 2000
        })
      }

      this.showSpinners = false;
      this.myPurchasedPro = res.myProductsPurchased[0];
      this.myProducts = res.myProducts[0];
      this.money = res.totalMoney[0];
    })
  }

  random(){
    let data = []
    for (let i = 0; i < 8; i++) {
      data.push(Math.round(Math.random()*100))
    }
    this.chart1Info.data[0].data = data;

  }

}

