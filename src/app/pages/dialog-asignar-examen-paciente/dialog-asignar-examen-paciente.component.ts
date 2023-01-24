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


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialog-asignar-examen-paciente',
  templateUrl: './dialog-asignar-examen-paciente.component.html',
  styleUrls: ['./dialog-asignar-examen-paciente.component.css'],
})
export class DialogAsignarExamenPacienteComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreMedico',
    'fechaExamen',
    'tipoExamen',
    'prueba',
    'accion',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosExamen: any;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioModal: ServicioModalesService
  ) {}

  ngOnInit(): void {
    this.getExamenFolio();
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
    this.servicioModal.getDatos(item);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createPDF() {
    const pdfDefinition: any = {
      content: [
        {
          columns: [
            {
              image: 'logo',
              width: 200,
              height: 100,
              alignment: 'left',
            },
            {
              text: '\n\n\nResponsable: LAQB. Salvador Martinez Ruiz \n Ced.Prof: 9036591',
              alignment: 'right',
              style : 'header'
            },
          ],
        },
        {
          text: 'Análisis Clínicos',
          margin: [35, 0, 0, 0],
          style : 'header'
        },
                {
            text:'________________________________________________________________________________________\n\n',
            margin: [35, 0, 0, 0],
        },
        {
          text: 'Paciente: \n\n',
          margin: [35, 0, 0, 0],
          style : 'texto'
        },
        {
          text: 'Edad: \n\n',
          margin: [35, 0, 0, 0],
          style : 'texto'
        },
        {
          text: 'Fecha del examen:\n\n',
          margin: [35, 0, 0, 0],
          style : 'texto'
        },
        {
          text: 'Medico:\n\n',
          margin: [35, 0, 0, 0],
          style : 'texto'
        },
        {
          text: 'Diagnostico:\n\n',
          margin: [35, 0, 0, 0],
          style : 'texto'
        },

        {
          style: 'tabla',
          table: {
            headerRows: 1,
            body: [
              [
                { text: 'ESTUDIO', style: 'tableHeader' },
                { text: 'RESULTADO', style: 'tableHeader' },
                { text: 'UNIDADES', style : 'tableHeader'},
                { text: 'VALORES DE REFERENCIA', style: 'tableHeader' },
                
              ],
              
            ],
          },
          layout: 'headerLineOnly',
          margin: [100, 0, 0, 0],
          
        },
      ],

      footer: {
        columns: ['Left part', { text: 'Right part', alignment: 'right' }],
        style : 'footer'
      },

      images: {
        logo: 'https://th.bing.com/th/id/R.d155bd6c7311a4cb2c8ca272438e09a9?rik=3AOC%2bTK8YFd%2beQ&pid=ImgRaw&r=0',
      },

      styles: {
        header: {
          fontSize: 12,
        },

        tableHeader: {
            
        },
        texto:{
            color: 'grey',
            fontSize: 14
        }
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  public openPDF(): void {
    const Dta = this.servicioModal.dataD
    console.log(Dta.id)
    let DATA = document.getElementById(Dta.id);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
