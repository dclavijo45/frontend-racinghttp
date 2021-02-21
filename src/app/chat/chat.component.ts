import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';
import * as jwt_decode from 'jwt-decode';
//import { Pipe, PipeTransform } from '@angular/core';
import * as dateFormat from 'dateformat';
//import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public data : any[] = [];
  public inputMsg: any = "";
  public token_jwt = localStorage.getItem("token");
  public showWriting: boolean = false;
  public fecha: Date = new Date();
  public actualizarBoxChat: boolean = false;
  public dateFormat = dateFormat;
  public remitente: string = "";
  public contadorRefreshChat = 0;
  public now = ()=>{
    return new Date()
  }
  public user: string;


  constructor(
    public SocketIoService: SocketioService,
    private route: Router,
    public Toastr: ToastrService) {
  }

  ngOnInit() {
    try {
      this.user = localStorage.getItem("token");
      if (this.user == null) {
        return this.route.navigate( ['/']);
      }
    } catch (error) {
      return this.route.navigate( ['/']);
    }

    let boxChat = document.getElementById("boxChatGeneral");
    this.SocketIoService.init(this.token_jwt);
    this.SocketIoService.listenerMessages().subscribe((msg) => {
      if (msg.remitente == this.user) {
        this.data.push({
          remitente: msg.remitente,
          emitente: msg.emitente,
          msg: msg.msg,
          img: "",
          dateSend: msg.dateSend
        });
        // Swal.fire({
        //   position: 'top-right',
        //   icon: 'info',
        //   title: `Mensaje de ${msg.remitente.slice(0, 10)}`,
        //   text: msg.msg,
        //   showConfirmButton: false,
        //   timer: 4000
        // })
        this.Toastr.info(`${msg.msg}`, `Message from ${msg.remitente.slice(0, 8)}`,{
          closeButton: false,
          extendedTimeOut: 2500
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
      if (msg.remitente == this.user) {
        if (msg.writing) {
          this.showWriting = true;
        }else{
          this.showWriting = false;
        }
      }
    });

    setInterval(() => {
    this.emitWriting()
  }, 500);

  }

  emit(msg: any){
    let boxChat = document.getElementById("boxChatGeneral");
    try {
      if (msg.length == 0 || msg == " ") {
        return false;
      }
      this.data.push({
          remitente: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM3OTYyNjIsImVtYWlsIjoiZ3J1cG9qZWRAZ21haWwuY29tIn0.qKwEUmJe608PZN30ALRT8fsw-7KzpYDzmbrRVUdj554",
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
        this.showWriting = false;
        this.SocketIoService.emitMessage({
        remitente: this.remitente,
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

  emitWriting(){
    if (this.inputMsg != "") {
      console.info(`Writing...`)
      this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.remitente,
        writing: true
      })
    }else{
      console.info(`Not writing`)
      this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.remitente,
        writing: false
      })
    }
  }

  disconnet(){
    this.SocketIoService.disconnect();
  }

//  viewWritingLive = setInterval(this.emitWriting, 3000);

  // if (this.inputMsg != "") {
  //     this.SocketIoService.emitWriting({
  //       emitente: this.user,
  //       remitente: this.remitente,
  //       writing: true
  //     })
  //   }else{
  //     this.SocketIoService.emitWriting({
  //       emitente: this.user,
  //       remitente: this.remitente,
  //       writing: false
  //     })
  //   }
}
