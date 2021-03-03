import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';
import jwtDecode from 'jwt-decode';
//import { Pipe, PipeTransform } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import * as dateFormat from 'dateformat';
//import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public server: string = "http://localhost:5000";
  private master_key = "";
  public dataCurrentUser = {profile_photo: "", name: "", lastname: "", user_id: ""}
  public data : any[] = [];
  public inputMsg: any = "";
  public jwt_decode: any = jwtDecode;
  public token_jwt = localStorage.getItem("token");
  public showWriting: boolean = false;
  public queryEscanear: boolean = false;
  public fecha: Date = new Date();
  public actualizarBoxChat: boolean = false;
  public dateFormat = dateFormat;
  public remitente: string = "";
  public contadorRefreshChat = 0;
  public showSpinnerSearchUsers: boolean = false;
  public orderShwSpinnerSrcUsers: boolean = false;
  public listUsersSearch: any[] = []
  public inputSearch: string = "";
  public now = ()=>{
    return new Date()
  }
  public user: string;


  constructor(
    public SocketIoService: SocketioService,
    private route: Router,
    public Toastr: ToastrService,
    private client: ClienteService) {
  }

  ngOnInit() {
    try {
      let uid = this.jwt_decode(localStorage.getItem("token"));
      this.user = uid.user_id;
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
      if (msg.remitente == this.user && msg.emitente == this.dataCurrentUser.user_id) {
        if (msg.writing) {
          this.showWriting = true;
        }else{
          this.showWriting = false;
        }
      }
    });

    let viewChatStatusSI = setInterval(() => {

    if (this.inputMsg != "") {
      this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.dataCurrentUser.user_id,
        writing: true
      });
      this.queryEscanear = true;
    }else{

      if (this.queryEscanear) {
        this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.dataCurrentUser.user_id,
        writing: false
      })
      this.queryEscanear = false
      }

    }
      }, 500);

    let viewFixSearchAsyncSI = setInterval(() =>{
      if (this.inputSearch == "") {
        this.listUsersSearch = []
      }
    }, 100)

    // function temporal
    let checkTockenSI = setInterval(() =>{
      this.client.postRequest(`${this.server}/api/v01/check/jwt`, {}, this.token_jwt).subscribe(
        (response: any) => {
          let res = JSON.parse(JSON.stringify(response));
          if (!res.auth_token) {
            this.Toastr.error(`Vuelva a inciar sesión`, `Token inválido`,{
              closeButton: false,
              extendedTimeOut: 2500
            })
            clearInterval(checkTockenSI);
            return this.route.navigate( ['/']);
          }
        },
        (error) =>{
          this.Toastr.error(`Revise su conexión a internet`, `Error ocurrido`,{
            closeButton: false,
            extendedTimeOut: 1500
          })
        }
      )
    },10000)

  }

  emit(msg: any){
    let boxChat = document.getElementById("boxChatGeneral");
    try {
      if (msg.length == 0 || msg == " " || this.dataCurrentUser.user_id == "") {
        return false;
      }
      this.data.push({
          remitente: this.dataCurrentUser.user_id,
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
        remitente: this.dataCurrentUser.user_id,
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

  emitsWriting(){
    if (this.inputMsg != "") {
      console.info(`Writing...`)
      this.queryEscanear = true;
      this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.dataCurrentUser.user_id,
        writing: true
      })
    }else{
      console.info(`Not writing`)
      this.queryEscanear = false;
      this.SocketIoService.emitWriting({
        emitente: this.user,
        remitente: this.dataCurrentUser.user_id,
        writing: false
      })
    }
  }

  disconnet(){
    this.SocketIoService.disconnect();
  }

  async searchUser(key: string){
    console.info(`Search key: ${key}`)
    if (key == "" || key == " ") {
      this.listUsersSearch = []
      return this.showSpinnerSearchUsers = false;
    }
    this.showSpinnerSearchUsers = true;
    this.client.postRequest(`${this.server}/api/v01/search/users`, {
      search_key: this.inputSearch
    }, this.token_jwt).subscribe(
      (response: any) => {
        let res = JSON.parse(JSON.stringify(response));
        let ResValidate;

        try {
          ResValidate = res[0].auth_token;
        } catch (error) {
          ResValidate = res.auth_token;
        }
        if (ResValidate) {
          this.listUsersSearch = res;
          this.showSpinnerSearchUsers = false;
        //   this.Toastr.success(`Datos recibidos`, `Token válido`,{
        //   closeButton: false,
        //   extendedTimeOut: 1500
        // })
        }else{
          this.listUsersSearch = []
          this.showSpinnerSearchUsers = false;
          this.Toastr.error(`Vuelva a inciar sesión`, `Token inválido`,{
          closeButton: false,
          extendedTimeOut: 1500
        })
        }
      },
      (error) => {
        console.error(error);
        this.showSpinnerSearchUsers = false;
          this.Toastr.error(`Se ha producido un problema`, `Error generado`,{
          closeButton: false,
          extendedTimeOut: 1500
        })
      }
    )
  }

  asignDataChatBox(user_id){
    console.log(user_id);
    let boxChat = document.getElementById("boxChatGeneral");
    this.listUsersSearch.forEach(element =>{
      if (element.user_id == user_id){
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
        return this.dataCurrentUser = {
          profile_photo: "",
          name: element.nombres,
          lastname: element.apellidos,
          user_id: element.user_id
        }
      }
    });
  }
}
