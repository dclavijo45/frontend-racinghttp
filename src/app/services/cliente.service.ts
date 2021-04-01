import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public _server: string = 'https://bchrty.alwaysdata.net';

  constructor(private http: HttpClient) {}

  getRequest(route: string, token?: string) {
    let config: any = {
      responseType: 'json',
    };
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config['headers'] = header;
    }
    console.log(config);

    return this.http.get(route, config);
  }

  postRequest(route: string, data?: any, token?: string) {
    if (token) {
      let config = {
        responseType: 'json',
        whitelistedDomains: [
          'localhost:5000',
          'bdc587af0fe7.ngrok.io',
          'localhost:4200',
        ],
      };
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(route, data, { headers });
    } else {
      let config: any = {
        responseType: 'json',
      };
      return this.http.post(route, data, config);
    }
  }

  putRequest(route: string, data?: any, token?: string) {
    if (token) {
      // let config = {
      //   responseType: "json",
      //   whitelistedDomains: ['localhost:5000','bdc587af0fe7.ngrok.io','localhost:4200']
      // }
      // let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${token}` })
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`);
      // const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

      return this.http.put(route, data, { headers });
    } else {
      let config: any = {
        responseType: 'json',
      };
      return this.http.put(route, data, config);
    }
  }
}
