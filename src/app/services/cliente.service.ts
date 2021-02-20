import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  // postRequest(route: string, data?:any) {

  //   let config:any = {
  //     responseType: "json"
  //   }

  //   return this.http.post(route, data, config);
  // }

  getRequest(route: string, token?:string) {

    let config:any = {
      responseType: "json"
    }
    if (token){
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    console.log(config);

    return this.http.get(route, config);
  }

  postRequest(route: string, data?:any, token?:string) {
    let config:any = {
      responseType: "json"
    }

    if (token){
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["header"] = header;
    }

    return this.http.post(route, data, config);
  }

}
