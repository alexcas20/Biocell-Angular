import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExamenesComponent } from '../dialog-examenes/dialog-examenes.component';

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
    'accion',
  ];

  dataSource!: MatTableDataSource<any>;

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
