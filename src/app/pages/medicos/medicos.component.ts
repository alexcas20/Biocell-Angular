import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { DialogMedicosComponent } from '../dialog-medicos/dialog-medicos.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  displayedColumns: string[] = [
    'folio',
    'nombreMedico',
    'apellidoP',
    'apellidoM',
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

  constructor(private api: ApiService, private dialogMedicos: MatDialog) {}

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

  deleteMedico(folio: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Tu no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Medico!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteMedico(folio).subscribe({
          next: (res: any) => {
            this.getMedicos();
          },
          error: () => {
            Swal.fire(
              'Error',
              'Se ha producido un error al eliminar el Medico',
              'error'
            );
          },
        });
        Swal.fire('Exito!', 'El Medico fue borrado correctamente.', 'success');
      } else {
        Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
      }
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
