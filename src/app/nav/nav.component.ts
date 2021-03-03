import { Component, OnInit } from '@angular/core';
import { AuthBehaviorSubjectService } from '../services/auth-behavior-subject.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private client: ClienteService, public auth: AuthBehaviorSubjectService) { }

  ngOnInit(): void {
  }

  async Buscar(search){
      let data = {
        search: search
      }
      this.client.postRequest('http://localhost:5000/api/v01/search/product', data).subscribe(

        (response: any) => {
          console.log(response)
      },
      (error) => {
        //this.load = true;

        console.log(error.status);

      })
    }

    logout(){
      this.auth.logout();
    }
}
