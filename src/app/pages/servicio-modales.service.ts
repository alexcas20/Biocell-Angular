import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})




export class ServicioModalesService {
  cual: boolean= false
  constructor() { }

  getDatos(data:any){
      this.cual = true
    alert("DATOS SETEADOS: " + data.nombre)


    }
  }

