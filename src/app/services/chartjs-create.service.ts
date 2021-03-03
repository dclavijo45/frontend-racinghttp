import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartjsCreateService {

  canvas: any;
  ctx: any;
  constructor() { }

  public init(id: string, data: object, title: string, type: string){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    return new Chart(this.ctx, {
				type: type,
				data: data,
				options: {
					responsive: true,
					title: {
						display: true,
						text: title
					},
					tooltips: {
						mode: 'index',
						intersect: true
					}
				}
      })
  }

  public updateChart(chart){
    return chart.update();
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

}
