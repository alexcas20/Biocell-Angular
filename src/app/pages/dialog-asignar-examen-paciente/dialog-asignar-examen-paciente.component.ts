import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServicioModalesService } from '../servicio-modales.service';
import jsPDF from 'jspdf';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  /*
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
              style: 'header',
            },
          ],
        },
        {
          text: 'Análisis Clínicos',
          margin: [35, 0, 0, 0],
          style: 'header',
        },
        {
          text: '________________________________________________________________________________________\n\n',
          margin: [35, 0, 0, 0],
          style: 'hr',
        },
        {
          text: 'Paciente:  datosExamen.nombre  \n\n',
          margin: [35, 0, 0, 0],
          style: 'texto',
        },
        {
          text: 'Edad: \n\n',
          margin: [35, 0, 0, 0],
          style: 'texto',
        },
        {
          text: 'Fecha del examen:\n\n',
          margin: [35, 0, 0, 0],
          style: 'texto',
        },
        {
          text: 'Medico:\n\n',
          margin: [35, 0, 0, 0],
          style: 'texto',
        },
        {
          text: 'Diagnostico:\n\n',
          margin: [35, 0, 0, 0],
          style: 'texto',
        },

        {
          style: 'tabla',
          table: {
            headerRows: 1,
            body: [
              [
                { text: 'ESTUDIO', style: 'tableHeader' },
                { text: 'RESULTADO', style: 'tableHeader' },
                { text: 'UNIDADES', style: 'tableHeader' },
                { text: 'VALORES DE REFERENCIA', style: 'tableHeader' },
              ],
            ],
          },
          layout: 'headerLineOnly',
          margin: [100, 0, 0, 0],
        },
      ],
      footer: {
        columns: [
          'Logo',
          { text: 'Sucursal' },
          {
            text: 'Direccion',
          },
        ],
        style: 'footer',
      },

      images: {
        logo: 'https://th.bing.com/th/id/R.d155bd6c7311a4cb2c8ca272438e09a9?rik=3AOC%2bTK8YFd%2beQ&pid=ImgRaw&r=0',
      },

      styles: {
        header: {
          fontSize: 12,
        },

        tableHeader: {},
        texto: {
          color: 'grey',
          fontSize: 14,
        },
        hr: {
          color: 'green',
        },
        tabla: {
          color: 'red',
        },
      },
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
  */
  public openPDF():void{
    var img = new Image()
    img.src = "../../../assets/images/headerbiocell.jpg"
    
    var doc = new jsPDF();

    doc.addImage(img, 'JPEG',10,10,190,30 )


    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Paciente: " + this.datosExamen.nombre, 20, 50);
    
    doc.text("Edad: "+ this.datosExamen.edad, 20, 60);
    doc.text("años ", 40, 60)
    doc.text("Sexo: "+this.datosExamen.sexo, 80, 60);
    doc.text("Fecha del Examen: "+this.datosExamen.fechaExamen, 20, 70)
    doc.text("Medico: "+this.datosExamen.nombreMedico, 20, 80)
    doc.text("Diagostico del paciente", 20, 90)
    
    
    doc.text("___________________________________________________________________________",20,101)
    doc.text("ESTUDIO", 40, 100)
    doc.text("RESULTADO", 70, 100)
    doc.text("UNIDADES", 107, 100)
    doc.text("VALORES DE REFERENCIA", 140, 100) 

    doc.text(""+ this.datosExamen.tipoExamen, 20, 110)
    doc.text(this.datosExamen.resultado, 70, 110)
    doc.text("" + this.datosExamen.dimensional, 107, 110)
    doc.text("", 140, 110) 

    doc.save("PruebaPDF.pdf")
  }

  
}
