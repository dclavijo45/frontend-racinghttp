import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';
import * as jwt_decode from 'jwt-decode';
import { Pipe, PipeTransform } from '@angular/core';
import * as dateFormat from 'dateformat';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public data : any[] = [];
  public inputMsg: any = "";
  public showWriting: boolean = false;
  public fecha: Date = new Date();
  public actualizarBoxChat: boolean = false;
  public dateFormat = dateFormat;
  public contadorRefreshChat = 0;
  public now = ()=>{
    return new Date()
  }
  //dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  public user: string;


  constructor(
    public SocketIoService: SocketioService,
    private route: Router) {
  }

  ngOnInit() {
    try {
      this.user = localStorage.getItem("token");
    } catch (error) {
      return this.route.navigate( ['/']);
    }

    let boxChat = document.getElementById("boxChatGeneral");
    this.SocketIoService.init();
    this.SocketIoService.listenerMessages().subscribe((msg) => {
      if (msg.remitente == this.user) {
        this.data.push({
          remitente: msg.remitente,
          emitente: msg.emitente,
          msg: msg.msg,
          img: "",
          dateSend: msg.dateSend
        });
        Swal.fire({
          position: 'top-right',
          icon: 'info',
          title: `Mensaje de ${msg.remitente.slice(0, 10)}`,
          text: msg.msg,
          showConfirmButton: false,
          timer: 4000
        })
        this.actualizarBoxChat = true;
        let contadorRefreshChatx = 0;
        this.contadorRefreshChat = contadorRefreshChatx;
        if (this.actualizarBoxChat) {
          this.actualizarBoxChat = false;
          let refresh = setInterval(function fun() {
            boxChat.scrollTop = boxChat.scrollHeight;
            contadorRefreshChatx++;
            if(contadorRefreshChatx == 10){
              clearInterval(refresh);
              contadorRefreshChatx = 0
              this.contadorRefreshChat = contadorRefreshChatx;
              this.actualizarBoxChat = false;
            }
          }, 50);
        }
      }
    });
    this.SocketIoService.listenerWriting().subscribe((msg) => {

    });
  }

  emit(msg: any, boxChata){
    let boxChat = document.getElementById("boxChatGeneral");

    try {
      if (msg.length == 0 || msg == " ") {
        return false;
      }
      this.data.push({
          remitente: "123321",
          emitente: this.user,
          msg: msg,
          img: "",
          dateSend: dateFormat(this.now(), "dd/mm/yy, h:MM TT")
        });
        this.actualizarBoxChat = true;
        let contadorRefreshChatx = 0;
        this.contadorRefreshChat = contadorRefreshChatx;
        if (this.actualizarBoxChat) {
          this.actualizarBoxChat = false;
          let refresh = setInterval(function fun() {
            boxChat.scrollTop = boxChat.scrollHeight;
            contadorRefreshChatx++;
            if(contadorRefreshChatx == 10){
              clearInterval(refresh);
              contadorRefreshChatx = 0
              this.contadorRefreshChat = contadorRefreshChatx;
              this.actualizarBoxChat = false;
            }
          }, 50);
        }
        this.inputMsg = "";
        console.log(this.data)
      this.SocketIoService.emitMessage({
        remitente: "123321",
        emitente: this.user,
        msg: msg,
        img: "",
        dateSend: dateFormat(this.now(), "dd/mm/yy, h:MM TT")
      });

    } catch (error) {
      console.error("ERRORR !!!! >:V")
      console.error(typeof this.data)
    }
  }

  emitWriting(msg){
    this.showWriting = false;
    if (msg == "" || msg == " ") {
      return false
    }
    console.info(`EMITENTE !!: ${this.user}`)
    this.SocketIoService.emitWriting({
      emitente: this.user,
      remitente: "123321",
      writing: true
    })
  }
}
