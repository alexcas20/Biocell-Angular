import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { ServicioModalesService } from '../servicio-modales.service';
import { DialogPacientesComponent } from '../dialog-pacientes/dialog-pacientes.component';
import { DialogAsignarExamenPacienteComponent } from '../dialog-asignar-examen-paciente/dialog-asignar-examen-paciente.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = [
    'folio',
    'nombre',
    'apellidoP',
    'apellidoM',
    'edad',
    'sexo',
    'telefono',
    'correo',
    'accion',
  ];
  dataSource!: MatTableDataSource<any>;

  showPDF: any;
  datosExamen: any;

  pacientes: [] = [];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialogPacientes: MatDialog, private dialogAsignarExamen: MatDialog,
    private modalService: ServicioModalesService
    ) {}

  ngOnInit(): void {
    this.datosExamen = this.modalService.datosExamen
    this.getPacientes();
  }

  openDialogPacientes() {
    this.dialogPacientes
      .open(DialogPacientesComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getPacientes();
        }
      });
  }

  getPacientes() {
    this.showPDF = false
    this.api.getPacientes().subscribe({
      next: (res) => {
        console.log(res);
        this.pacientes = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        Swal.fire('Error', 'No se han encontrado los usuarios', 'error');
      },
    });
  }

  editPaciente(row: any) {
    this.dialogPacientes
      .open(DialogPacientesComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getPacientes();
        }
      });
  }

  deletePaciente(folio: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Tu no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Paciente!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deletePaciente(folio).subscribe({
          next: (res: any) => {
            this.getPacientes();
          },
          error: () => {
            Swal.fire(
              'Error',
              'Se ha producido un error al eliminar el Paciente',
              'error'
            );
          },
        });
        Swal.fire(
          'Exito!',
          'El Paciente fue borrado correctamente.',
          'success'
        );
      } else {
        Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
      }
    });
  }

  eliminarPacientes(){

    Swal.fire({
      title: 'Estas seguro/a?',
      text: "No podras reevertir la accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.eliminarPacientes()
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Exito!',
          'Todos los examenes han sido eliminados.',
          'success'
        )
        
        this.getPacientes();
      })
      }
      else{
       
          Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
        
      }
    })
    
  }

  asignarExamenPaciente(folio:any){
    this.dialogAsignarExamen
      .open(DialogAsignarExamenPacienteComponent, {
        width: '60%',
        data: folio
      })
      .afterClosed()

     
     
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
