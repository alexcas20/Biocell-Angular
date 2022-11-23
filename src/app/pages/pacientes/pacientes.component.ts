import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPacientesComponent } from '../dialog-pacientes/dialog-pacientes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ['folio','paciente','edad', 'sexo', 'telefono', 'correo','accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialogPacientes: MatDialog) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  openDialogPacientes(){
    this.dialogPacientes.open(DialogPacientesComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getPacientes();
      }
    })
  }

  getPacientes(){
    this.api.getPacientes().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        Swal.fire('Error','No se han encontrado los usuarios','error')
      }
    })
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
