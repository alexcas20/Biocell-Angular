import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';


@Component({
  selector: 'app-dialog-buscar-medico',
  templateUrl: './dialog-buscar-medico.component.html',
  styleUrls: ['./dialog-buscar-medico.component.css']
})
export class DialogBuscarMedicoComponent implements OnInit {

  listarMedicos:any[] = []

  


  constructor(private service: ApiService, private servicioModal: ServicioModalesService,
    private dialogExamenes: MatDialog, private dialogRef: MatDialogRef<DialogComponent>,) { }

  ngOnInit(): void {

    this.getMedicos()
  }

  getMedicos() {
    this.service.getMedicos().subscribe( resp => this.listarMedicos = resp)
  }


  selectMedico(item:any){
    console.log(item);
    this.servicioModal.getDatosMedico(item);
      

     


  
    this.dialogRef.close();
  }

  
}
