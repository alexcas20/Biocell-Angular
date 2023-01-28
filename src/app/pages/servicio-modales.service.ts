import { EventEmitter, Injectable, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})




export class ServicioModalesService {
  cual: boolean= false
  folioPaciente:any;
  nombrePaciente: any;
  medico: boolean = false;
  datosExamen: any;

  nombreMedico!:string;
  especialidad!:string;
  especialidadS: any;
  nombreMedicoS: any;
  dataD: any;

  localMedico!:any;
  localEspecialidad!: any;

  constructor(private api: ApiService) { }

  getDatos(data:any){
    console.log(data)
    this.datosExamen = data;



    }

    getDatosMedico(data:any){
      console.log(data)
      this.nombreMedicoS = data.nombreMedico
      this.especialidadS = data.especialidad
      console.log("Nombre: ", this.nombreMedicoS, "espe: ", this.especialidadS);

      localStorage.setItem("medico", this.nombreMedicoS);
      localStorage.setItem("especialidad", this.especialidadS);

     
     
    }

    



  obtenerDataHtml(data: any){

    console.log(data)

    this.dataD = data;

  
  }
  
  
}
