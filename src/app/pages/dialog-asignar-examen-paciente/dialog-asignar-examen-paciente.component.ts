import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

import { ServicioModalesService } from '../servicio-modales.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    'estudio',
    'accion',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosExamen: any;
  apellidoP: any;
  apellidoM: any;
  activarDescarga: boolean = false;
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioModal: ServicioModalesService
  ) {}

  ngOnInit(): void {
    this.getExamenFolio();
    localStorage.getItem('medico');
    localStorage.getItem('especialidad');
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
    this.activarDescarga = true;
    this.api.getDatosMedico(this.datosExamen.nombreMedico).subscribe((resp) => {
      this.apellidoP = resp.apellidoP;
      this.apellidoM = resp.apellidoM;
      console.log(resp);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openPDF(): void {
    const datosExamen = this.datosExamen;

    console.log(datosExamen);

    var img = new Image();
    img.src = '../../../assets/images/plantillaBiocell.jpg';

    var img2 = new Image();
    img2.src = '../../../assets/images/footerbiocell.jpg';

    let doc = new jsPDF();

    const values = datosExamen.parametros.map((item)=>Object.values(item));

    doc.addImage(img, 'JPEG', 1, 1, 200, 300);
    doc.addImage(img2, 'JPEG', 10, 260, 190, 30);

    doc.setFontSize(12);

    doc.setFont('helvetica', 'bold');
    doc.text('Paciente: ' , 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(datosExamen?.nombre + ' ' +datosExamen?.apellidoP + ' ' + datosExamen?.apellidoM, 40, 50)

    doc.setFont('helvetica', 'bold');
    doc.text('Edad: ', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(datosExamen?.edad + ' años', 33, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('Sexo: ' , 80, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(datosExamen?.sexo, 93, 60 )

    doc.setFont('helvetica', 'bold');
    doc.text('Fecha del Examen: ' , 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(datosExamen?.fechaExamen, 60, 70)

    doc.setFont('helvetica', 'bold');
    doc.text('Medico: ', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(datosExamen?.nombreMedico + ' ' +this.apellidoP + ' ' + this.apellidoM, 37, 80)

    doc.setFont('helvetica', 'bold');
    doc.text('Diagostico del paciente', 20, 90);

    autoTable(doc, {
      columnStyles: {0: {halign: 'center'}},
      margin: {top: 100, left: 18.4},
      head:[["ESTUDIO","RESULTADO", "UNIDADES", "VALORES DE REFERENCIA"]],
      theme: "plain",
      body:[
        [datosExamen.estudio],
        [values]
      ]
    })
    
    doc.save('Examen de ' + datosExamen?.nombre + '.pdf');
  }
}
