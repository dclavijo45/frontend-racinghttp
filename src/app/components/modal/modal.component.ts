import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  eventR: string;

  resultadoB: boolean = false;

  ngOnInit(): void {
  }

  useEmit(value: string){
    if (value == "1"){
      console.log(value);
      this.resultadoB = true;
    }else{
      console.log(value);
      this.resultadoB = false;
    }
  }

}
