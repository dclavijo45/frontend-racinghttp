import { Injectable } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class CreateChartService {

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }
  public colorExample = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  constructor() { }

  public createChart(ChartDataSets: ChartDataSets[], lineChartLabels: Label[], lineChartOptions: ChartOptions, lineChartColors: Color[], lineChartLegend: boolean, lineChartType: string, lineChartPlugins?: any[]){
    return true;
  }
}
