import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPacientesComponent } from '../dialog-pacientes/dialog-pacientes.component';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogMedicosComponent } from '../dialog-medicos/dialog-medicos.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  displayedColumns: string[] = [
    'folio',
    'paciente',
    'especialidad',
    'edad',
    'sexo',
    'telefono',
    'correo',
    'accion',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialogMedicos: MatDialog) { }

  ngOnInit(): void {
    this.getMedicos();
  }

  openDialogMedicos() {
    this.dialogMedicos
      .open(DialogMedicosComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getMedicos();
        }
      });
  }

  getMedicos() {
    this.api.getMedicos().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        Swal.fire('Error', 'No se han encontrado los usuarios', 'error');
      },
    });
  }

  editMedico(row: any) {
    this.dialogMedicos
      .open(DialogMedicosComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getMedicos();
        }
      });
  }

  deleteMedico(code: any) {
    this.api.deletePaciente(code).subscribe({
      next: (res) => {
        this.getMedicos();
        Swal.fire('Exito', 'Se ha eliminado el usuario', 'success');
      },
      error: () => {
        Swal.fire(
          'Error',
          'Se ha producido un error al eliminar el usuario',
          'error'
        );
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
