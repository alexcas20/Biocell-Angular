import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

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
  especialidad: any;
  selectPaciente: any;

  tiposExamenes: any;
  estudios: any;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  noPaciente =  false;
  guardar= true;

  //Folio Examen
  numeroRandom = Math.round(Math.random() * 5000);





  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogPacientes: MatDialog,
    private DialogMedicos: MatDialog,
    private ServicioModal: ServicioModalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      folioExamen: ['', Validators.required],
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
      tipoExamen: ['', ],
      estudio: ['', ],
      resultado: ['',],
      dimensional: ['',],
      parametros: this.formBuilder.array([]),

    });

    

    

    if (this.data) {
      if (this.data.estado) {
        this.guardar = false;
        console.log(this.data);
        this.actionBtn = 'Finalizar';
        this.productForm.controls['nombreMedico'].patchValue(
          this.data.nombreMedico
        );
        this.productForm.controls['especialidad'].patchValue(
          this.data.especialidad
        );
        this.productForm.controls['folioExamen'].patchValue(
          this.data.folioExamen
        );
        this.productForm.controls['folio'].patchValue(this.data.folio);
        this.productForm.controls['nombre'].patchValue(this.data.nombre);
        this.productForm.controls['apellidoP'].patchValue(this.data.apellidoP);
        this.productForm.controls['apellidoM'].patchValue(this.data.apellidoM);
        this.productForm.controls['edad'].patchValue(this.data.edad);
        this.productForm.controls['sexo'].patchValue(this.data.sexo);
        this.productForm.controls['telefono'].patchValue(this.data.telefono);
        this.productForm.controls['correo'].patchValue(this.data.correo);
        this.productForm.controls['fechaExamen'].patchValue(
          this.data.fechaExamen
        );
        this.productForm.controls['tipoExamen'].patchValue(
          this.data.tipoExamen
        );
      } else if (this.data?.folio) {
        console.log(this.data);
        console.log('condicional folio' + this.data.folio);
        this.noPaciente = true;
        this.productForm.controls['folio'].patchValue(this.data.item?.folio);
        this.productForm.controls['folioExamen'].patchValue(this.data.folio);
        this.productForm.controls['nombre'].patchValue(this.data.item?.nombre);
        this.productForm.controls['apellidoP'].patchValue(
          this.data.item?.apellidoP
        );
        this.productForm.controls['apellidoM'].patchValue(
          this.data.item?.apellidoM
        );
        this.productForm.controls['edad'].patchValue(this.data.item?.edad);
        this.productForm.controls['sexo'].patchValue(this.data.item?.sexo);
        this.productForm.controls['telefono'].patchValue(
          this.data.item?.telefono
        );
        this.productForm.controls['correo'].patchValue(this.data.item?.correo);
      }
    }

    this.api.getTiposExamenes().subscribe((res) => {
      console.log(res);
      this.tiposExamenes = res;
    });

    // Cuando cambie el examen
    this.productForm
      .get('tipoExamen')
      ?.valueChanges.pipe(switchMap((estudio) => this.api.getEstudios(estudio)))
      .subscribe((resp) => {
        console.log(resp)
        this.estudios =resp. estudios;
      });  
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
    this.traerDatos();
    this.DialogMedicos.open(DialogBuscarMedicoComponent, {
      width: '50%',
    });
  }

  traerDatos() {
    this.productForm.controls['nombreMedico'].patchValue(
      localStorage.getItem('medico')
    );
    this.productForm.controls['especialidad'].patchValue(
      localStorage.getItem('especialidad')
    );
  }

  registrarExamen(form: registrarExamen) {
    if (this.guardar) {
      this.api
        .registarExamen(form)
        .subscribe({
          next: (res) => {
            console.log('Examen guardado: ', res);
            Swal.fire('Exito', 'Se ha registrado el examen', 'success');
           
            this.dialogRef.close('save');
            localStorage.removeItem('medico');
            localStorage.removeItem('especialidad');
            setTimeout(() => {
              this.reloadCurrentRoute();
            }, 2000);
          },
          error: () => {
            Swal.fire(
              'Error',
              'Se ha producido un error al registar el examen',
              'error'
            );
          },
        });

    } else {
      Swal.fire({
        title: '¿Estas seguro/a de finalizar el examen?',
        text: 'No podras revertir los cambios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, finalizar!',
      }).then((result) => {
        if (result.isConfirmed) {
          const folio = this.productForm.get('folioExamen')?.value;
          console.log(folio);
          this.api
            .finalExamen(folio).subscribe(resp => console.log(resp))
           
          Swal.fire('', 'El examen ha sido finalizado.', 'success');
          console.log("dESDE EL FINALIZAR")
          console.log(this.productForm.value)
          this.api.agregarExamen(form.folio).subscribe(resp => console.log(resp))

         
        } else {
          Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
        }
      });
    }
  }


  parametros() : FormArray {  
    return this.productForm.get("parametros") as FormArray  
  }  
     
  newParametro(): FormGroup {  
    return this.formBuilder.group({  
      nombre: '',  
      resultado: 0,  
    })  
  }  
     
  addParametro() {  
    this.parametros().push(this.newParametro());  
  }  
     
  removeParametro(i:number) {  
    this.parametros().removeAt(i);  
  }  
     
  

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
