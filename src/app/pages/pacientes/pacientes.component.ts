import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    this.api.getPacientes().subscribe({
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

  deletePaciente(code: any) {
    this.api.deletePaciente(code).subscribe({
      next: (res) => {
        this.getPacientes();
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
