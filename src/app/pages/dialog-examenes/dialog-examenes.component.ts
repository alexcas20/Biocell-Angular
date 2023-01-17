import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DialogBuscarPacienteComponent } from '../dialog-buscar-paciente/dialog-buscar-paciente.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';
import { DialogBuscarMedicoComponent } from '../dialog-buscar-medico/dialog-buscar-medico.component';
import registrarExamen from 'src/app/models/registrarExamen.interface';

@Component({
  selector: 'app-dialog-examenes',
  templateUrl: './dialog-examenes.component.html',
  styleUrls: ['./dialog-examenes.component.css'],
})
export class DialogExamenesComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Guardar';
  hide = true;
  cual: boolean = false;
  medico: boolean = false;
  nombreMedico!: string;

  nameMedico: any;
  especialidad:any;

  selectPaciente: any;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogPacientes: MatDialog,
    private DialogMedicos: MatDialog,
    private ServicioModal: ServicioModalesService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      folio: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      nombreMedico: ['', Validators.required],
      especialidad: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      fechaExamen: ['', Validators.required],
      tipoExamen: ['', Validators.required],
      prueba: ['', Validators.required],
      resultado: ['', Validators.required],
      dimensional: ['', Validators.required],
    });

    if (this.data) {
      this.productForm.controls['folio'].patchValue(this.data.folio);
      this.productForm.controls['nombre'].patchValue(this.data.nombre);
      this.productForm.controls['apellidoP'].patchValue(this.data.apellidoP);
      this.productForm.controls['apellidoM'].patchValue(this.data.apellidoM);
      this.productForm.controls['edad'].patchValue(this.data.edad);
      this.productForm.controls['sexo'].patchValue(this.data.sexo);
      this.productForm.controls['telefono'].patchValue(this.data.telefono);
      this.productForm.controls['correo'].patchValue(this.data.correo);      
    }

    this.traerDatos()
  }

  BuscarPacientes() {
    this.dialogPacientes
      .open(DialogBuscarPacienteComponent, {
        width: '60%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getPacientes();
        }
      });
    this.dialogRef.close();
  }

  getPacientes() {
    this.api.getPacientes().subscribe({
      next: (res) => {
        console.log(res);
        
      },
      error: (err) => {
        Swal.fire('Error', 'No se han encontrado los usuarios', 'error');
      },
    });
  }

  buscarMedicos() {
    this.DialogMedicos.open(DialogBuscarMedicoComponent, {
      width: '50%',
    });



    this.traerDatos();

  }

  traerDatos() {
   
   this.productForm.controls['nombreMedico'].patchValue(localStorage.getItem("medico"));
   this.productForm.controls['especialidad'].patchValue(localStorage.getItem("especialidad"));
     
    
  }

  

  registrarExamen(folio:any,form:registrarExamen){
    this.api.agregarExamen(this.productForm.get("folio")?.value, form).subscribe({
      next: (res) => {
        console.log("Examen guardado: ", res)
        Swal.fire('Exito', 'Se ha registrado el examen', 'success');
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error: () => {
        Swal.fire(
          'Error',
          'Se ha producido un error al registar el examen',
          'error'
        );
      },
    });
  }
}
