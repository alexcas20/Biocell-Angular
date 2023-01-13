import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';


@Component({
  selector: 'app-dialog-buscar-medico',
  templateUrl: './dialog-buscar-medico.component.html',
  styleUrls: ['./dialog-buscar-medico.component.css']
})
export class DialogBuscarMedicoComponent implements OnInit {

  displayedColumns: string[] = [
    'folio',
    'nombre',
    'especialidad',
    'edad',
    'sexo',
    'telefono',
    'accion'
    
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  


  constructor(
    private service: ApiService,
    private servicioModal: ServicioModalesService,
   private dialogRef: MatDialogRef<DialogComponent>,) { }

  ngOnInit(): void {

    this.getMedicos()
  }

  getMedicos() {
    this.service.getMedicos().subscribe( resp  => {

      console.log(resp);
         this.dataSource = new MatTableDataSource(resp);
         this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    })
  }


  selectMedico(item:any){
    console.log(item);
    this.servicioModal.getDatosMedico(item);
  
    this.dialogRef.close();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
