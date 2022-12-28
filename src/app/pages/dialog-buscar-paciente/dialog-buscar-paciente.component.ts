import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';

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
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private ServicioModal : ServicioModalesService
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

  editPaciente(e: any) {
    console.log(e);
    this.ServicioModal.getDatos(e);
    this.dialogRef.close();
  }

 selectPaciente(e:any){
    console.log("Dta: "+e._value);
    this.dialogRef.close();
    this.ServicioModal.getDatos(e);

    }
  }

