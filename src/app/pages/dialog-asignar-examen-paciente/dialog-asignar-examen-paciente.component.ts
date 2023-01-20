import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServicioModalesService } from '../servicio-modales.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    'prueba',
    'accion'
    
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosExamen: any;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioModal : ServicioModalesService
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

  selectExamen(item: any) {
    console.log(item);
  this.datosExamen = item;
    this.servicioModal.getDatos(item)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createPDF(){

   
 
    const pdfDefinition: any = {
      content: [
        {
          text: 'Datos Examen: ',
          style: 'header'
        },
        "_______________________________________",
        {
          text: 'Datos Paciente',
          style: 'subheader'
        },
        {
          table: {
            heights: [10, 20, 30],
            body: [
              [
                'Nombre',
                'Apellido Paterno',
                'Apellido Materno'
              ],
              [
                this.datosExamen.nombre,
                this.datosExamen.apellidoP,
                this.datosExamen.apellidoM,
              ],
            ]
          },
          layout: 'noBorders'
        }
      ],
      styles: {
        table: {
          fontSize: 22,
          bold: true
        },
    }
 
   
 
  }
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}

}
