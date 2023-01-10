import { EventEmitter, Injectable, Output } from '@angular/core';

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

  constructor() { }

  getDatos(data:any){
      this.cual = true
      console.log("DATA: " + data)
      this.folioPaciente = data.folio;
      this.nombrePaciente = data.nombre;

      console.log(`folio: ${this.folioPaciente} - nombre: ${this.nombrePaciente}`)


    }

    getDatosMedico(data:any){
      console.log(JSON.stringify(data))
      this.nombreMedicoS = data.nombreMedico
      this.especialidadS = data.especialidad

      this.getNombreMedico()
     
    }

     getNombreMedico(){
          this.nombreMedico = this.nombreMedicoS
          this.especialidad = this.especialidadS
          this.localMedico = localStorage.setItem('medico',this.nombreMedico);
          this.localEspecialidad = localStorage.setItem('especialidad',this.especialidad)
          console.log(this.nombreMedicoS);
          console.log(this.especialidadS);

    }
  }

