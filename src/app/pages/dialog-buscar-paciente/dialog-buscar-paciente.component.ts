
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ServicioModalesService } from '../servicio-modales.service';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dialog-buscar-paciente',
  templateUrl: './dialog-buscar-paciente.component.html',
  styleUrls: ['./dialog-buscar-paciente.component.css'],
})
export class DialogBuscarPacienteComponent implements OnInit {

  numeroRandom = Math.round(Math.random()*5000)

  

  displayedColumns: string[] = [
    'folio',
    'nombre',
    'apellidoP',
    'apellidoM',
    'edad',
    'sexo',
    'telefono',
    'accion'
    
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private ServicioModal : ServicioModalesService,
    private dialogExamenes: MatDialog
  ) {}

  ngOnInit(): void {  
    this.getPacientes();
  }



  getPacientes() {
    this.api.getPacientes().subscribe({
      next: (res) => {
        console.log(res);
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  editPaciente(item: any) {
    console.log(item);
    localStorage.setItem("folio", "LAB"+JSON.stringify(this.numeroRandom))
    this.ServicioModal.getDatos(item);
    this.dialogExamenes
    .open(DialogExamenesComponent, {
      width: '60%',
      data: {
        item,
        folio: localStorage.getItem("folio")
      }
    });
    this.dialogRef.close();
  }

//  selectPaciente(e:any){
//   this.ServicioModal.getDatos(e);
//     console.log("Dta: "+e._value);
//     this.dialogRef.close();
  

//     }


  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  }

