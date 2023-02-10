import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css'],
})
export class ExamenesComponent implements OnInit {
  displayedColumns: string[] = [
  
    'folioExamen',
    'nombre',
    'nombreMedico',
    'fechaExamen',
    'estado',
    'accion'
  ];

  dataSource!: MatTableDataSource<any>;
  examenes: [] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialogExamenes: MatDialog) {}

  ngOnInit(): void {
     this.getExamenes();
  }

  openDialogExamenes() {
    this.dialogExamenes
      .open(DialogExamenesComponent, {
        width: '60%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getExamenes();
        }
      });
  }

  editExamen(item: any){
    console.log(item);

    this.dialogExamenes
    .open(DialogExamenesComponent, {
      width: '60%',
      data: item
    }) 
    .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getExamenes();
        }
      });
      
    
  }



  getExamenes(){
    this.api.getExamenes().subscribe({
      next:(res)=>{
        console.log(res);
        this.examenes = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  borrarExamen(folio: any){
    this.api.borrarExamen(folio)
      .subscribe(resp => {
        console.log(resp);
        this.getExamenes();
      })
  }

  borrarExamenes(){

    Swal.fire({
      title: 'Estas seguro/a?',
      text: "No podras reevertir la accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar Todo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.borrarExamenes()
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Exito!',
          'Todos los examenes han sido eliminados.',
          'success'
        )
        this.getExamenes();
      })
      }
      else{
       
          Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
        
      }
    })
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
