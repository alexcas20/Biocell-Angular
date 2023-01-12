import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';

@Component({
  selector: 'app-dialog-buscar-paciente',
  templateUrl: './dialog-buscar-paciente.component.html',
  styleUrls: ['./dialog-buscar-paciente.component.css'],
})
export class DialogBuscarPacienteComponent implements OnInit {
  productForm!: FormGroup;
  ListarPacientes: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private ServicioModal : ServicioModalesService,
    private dialogExamenes: MatDialog
  ) {}

  ngOnInit(): void {  
    this.getPacientes();
  }

  getPacientes() {
    this.api.getPacientes().subscribe({
      next: (res) => {
        console.log(res);
        let values = Object.values(res);
        this.ListarPacientes = values;
        console.log('Lista:  ', this.ListarPacientes);
      },
    });
  }

  editPaciente(item: any) {
    console.log(item);
    this.ServicioModal.getDatos(item);
    this.dialogExamenes
    .open(DialogExamenesComponent, {
      width: '60%',
      data: item
    });
    this.dialogRef.close();
  }

//  selectPaciente(e:any){
//   this.ServicioModal.getDatos(e);
//     console.log("Dta: "+e._value);
//     this.dialogRef.close();
  

//     }
  }

