import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Socket from '../services/socket.io.js';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public socketServer: Socket;
  public init() {
    this.socketServer = Socket('http://localhost:3000');
  }
  public listener(): Observable<any> {
      return new Observable<any>(obs => {
          this.socketServer.on("msg-server", (message: any) => {
              obs.next(message);
          });
      })
    }
    public emit(data: any) {
      this.socketServer.emit("msg", data);
    }
}
