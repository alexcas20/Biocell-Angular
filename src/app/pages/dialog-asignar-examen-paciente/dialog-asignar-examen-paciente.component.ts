import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog-asignar-examen-paciente',
  templateUrl: './dialog-asignar-examen-paciente.component.html',
  styleUrls: ['./dialog-asignar-examen-paciente.component.css']
})
export class DialogAsignarExamenPacienteComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreMedico',
    'fechaExamen',
    'tipoExamen',
    'prueba'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getExamenFolio()
  }

  getExamenFolio() {
    this.api.obtenerExamenFolio(this.data).subscribe((resp) => {
      const respFinal = resp[0].examenesPacientes;
      console.log(respFinal);
      this.dataSource = new MatTableDataSource(respFinal);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
