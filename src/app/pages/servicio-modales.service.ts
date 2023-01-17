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

  nombreMedico!:string;
  especialidad!:string;
  especialidadS: any;
  nombreMedicoS: any;

  localMedico!:any;
  localEspecialidad!: any;

  constructor(private api: ApiService) { }

  getDatos(data:any){
      this.cual = true
      console.log("DATA: " + data)
      this.folioPaciente = data.folio;
      this.nombrePaciente = data.nombre;

      console.log(`folio: ${this.folioPaciente} - nombre: ${this.nombrePaciente}`)


    }

    getDatosMedico(data:any){
      console.log(data)
      this.nombreMedicoS = data.nombreMedico
      this.especialidadS = data.especialidad
      console.log("Nombre: ", this.nombreMedicoS, "espe: ", this.especialidadS);

      localStorage.setItem("medico", this.nombreMedicoS);
      localStorage.setItem("especialidad", this.especialidadS);

      this.getNombreMedico()
     
    }

     getNombreMedico(){
      localStorage.getItem("medico");
      localStorage.getItem("especialidad");

     // this.api.getMedicos()
        //  this.nombreMedico = this.nombreMedicoS
        //  this.especialidad = this.especialidadS
        //  this.localMedico = localStorage.setItem('medico',this.nombreMedico);
        //  this.localEspecialidad = localStorage.setItem//('especialidad',this.especialidad)
        //  console.log(this.nombreMedicoS);
        //  console.log(this.especialidadS);
     }
    }
  

