import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/pages/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  titulo = 'Usuarios'
  usuarios:any;
  displayedColumns: string[] = ['code', 'user', 'rol', 'status', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getAllUsers();
    /* this.api.getUsers().subscribe((resp) => {
      console.log(resp)
      this.usuarios = resp;
    }) */
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllUsers();
      }
    })
  }

  getAllUsers(){
    this.api.getUsers().subscribe({
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

  editUser(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        Swal.fire('Exito!','Se ha editado correctamente el usuario','success')
        this.getAllUsers();
      }
    })
  }

  deleteUser(code:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Tu no podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar usuario!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.deleteUser(code).subscribe({
          next:(res)=>{
            
            this.getAllUsers();
           
          },
          error:()=>{
            Swal.fire('Error','Se ha producido un error al eliminar el usuario','error')
          }
        })
        Swal.fire(
          'Exito!',
          'El usuario fue borrado correctamente.',
          'success'
        )
      }
      else{
        Swal.fire(
          'Atencion!',
          'Verifique sus acciones.',
          'warning'
        )
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
