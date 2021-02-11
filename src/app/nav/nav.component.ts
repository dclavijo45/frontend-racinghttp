import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private client: ClienteService) { }

  @Output() public ResData: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  enviarEvento(){
    this.ResData.emit({
            id: 2,
            service: "running"
          })
  }
  async Buscar(search){
      let data = {
        search: search
      }
      this.client.postRequest('http://localhost:5000/api/v01/search/product', data).subscribe(

        (response: any) => {
          console.log(response)
          this.ResData.emit({
            id: 2,
            service: "running"
          })
      },
      (error) => {
        //this.load = true;

        console.log(error.status);

      })
    }
}
