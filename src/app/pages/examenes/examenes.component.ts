import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css'],
})
export class ExamenesComponent implements OnInit {
  displayedColumns: string[] = [
  
    'folio',
    'nombre',
    'nombreMedico',
    'fechaExamen',
    'estatus',
    'accion',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialogPacientes: MatDialog) {}

  ngOnInit(): void {
     this.getExamenes();
  }

  openDialogExamenes() {
    this.dialogPacientes
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



  getExamenes(){
    this.api.getExamenes().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
