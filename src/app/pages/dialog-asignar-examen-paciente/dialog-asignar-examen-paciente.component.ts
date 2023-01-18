import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-asignar-examen-paciente',
  templateUrl: './dialog-asignar-examen-paciente.component.html',
  styleUrls: ['./dialog-asignar-examen-paciente.component.css']
})
export class DialogAsignarExamenPacienteComponent implements OnInit {
  displayedColumns: string[] = [
    'folio',
    'nombre',
    'apellidoP',
    'apellidoM',
    'edad',
    'sexo',
    'telefono',
    'accion',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
