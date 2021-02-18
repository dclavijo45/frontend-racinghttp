import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
//import { Observable } from 'rxjs';
//import * as io from '../services/socket.io.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public data : any[] = [];
  public inputMsg: any = "";

  public user= {
    id : 123456
  }

  constructor(public SocketIoService: SocketioService) {
  }

  ngOnInit() {
    this.SocketIoService.init();
    this.SocketIoService.listener().subscribe((msg) => {
      console.log(msg);
      this.data = msg;
      });
  }

  emit(msg: any){
    try {
      this.data.push({
          emitente: 123456,
          msg: msg,
          img: ""
        });
        this.inputMsg = "";
        console.log(this.data)
      this.SocketIoService.emit(this.data);

    } catch (error) {
      console.error("ERRORR !!!! >:V")
      console.error(typeof this.data)
    }
  }

}
