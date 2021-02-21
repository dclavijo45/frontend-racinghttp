import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Socket from '../services/socket.io.js';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public socketServer: Socket;
  public init(token) {
    this.socketServer = Socket('http://8e688a02e47b.ngrok.io',{
      reconnectionDelayMax: 10000,
      query: `token=${token}`
    });
  }

    public emitMessage(data: any) {
      this.socketServer.emit("general-message", data);
    }

    public emitWriting(data: any) {
      this.socketServer.emit("general-writing", data);
    }

    public listenerMessages(): Observable<any> {
      return new Observable<any>(obs => {
          this.socketServer.on("general-message-server", (message: any) => {
              obs.next(message);
          });
      })
    }

    public listenerWriting(): Observable<any> {
      return new Observable<any>(obs => {
          this.socketServer.on("general-writing-emit", (message: any) => {
              obs.next(message);
          });
      })
    }

    public disconnect(){
      this.socketServer.disconnect(true);
    }
}
