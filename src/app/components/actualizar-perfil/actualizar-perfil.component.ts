import { Component, OnInit } from '@angular/core';
import { CreateChartService } from '../../services/create-chart.service';

@Component({
    selector: 'app-actualizar-perfil',
    templateUrl: './actualizar-perfil.component.html',
    styleUrls: ['./actualizar-perfil.component.css']
})
export class ActualizarPerfilComponent implements OnInit {

    constructor(private createChart: CreateChartService) { }

    public chartInfo: any = {
        data: [{ data: [10, 20, 30, 20, 10, 1, 20], label: '¿Qué hora es?', lineTension: 0.2 }],
        label: ['el', 'futuro', 'no', 'es', 'mañana,', 'es', 'hoy'],
        options: {
            responsive: true
        },
        colors: [{
            backgroundColor: this.createChart.colorExample.grey,
            borderColor: this.createChart.colorExample.grey
        }],
        legend: true,
        type: 'line',
        plugins: []
    }
    public chartClicked = this.createChart.chartClicked;

    public profileInfo = {
        name: "Name Example",
        lastname: "Lastname Example",
        email: "Email Example",
        position: "Position Example",
        img: "https://royale.apache.org/wp-content/uploads/2016/06/blank-profile-picture.png",
        pwd: ""
    }

    public hoverEvents = {
        name: false,
        email: false,
        position: false,
        pwd: false
    }

    public checkEvents = {
        name: false,
        email: false,
        position: false,
        pwd: false
    }


    ngOnInit(): void {
        this.random()
    }

    random() {
        let data = []
        for (let i = 0; i < 8; i++) {
            data.push(Math.round(Math.random() * 20) <= 5 ? 20 : Math.round(Math.random() * 20))
        }
        this.chartInfo.data[0].data = data;

    }

}
