import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

import Swal from 'sweetalert2';
import { Observable, Subscriber, filter } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  titulo = 'Usuarios';
  usuarios: any;

 






  constructor(private api: ApiService, private dialog: MatDialog,
    private sanitizer : DomSanitizer) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  
  isAdmin(): boolean{
    const admin = localStorage.getItem('rol');
    if(admin === 'admin'){
      return true;
    } else
      return false
  }
  

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllUsers();
        }
      });
  }

  getAllUsers() {
    this.api.getUsers().subscribe({
      next: (res) => {

        this.usuarios = res;
       
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

  deleteUser(item:any){
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

        this.api.deleteUser(item.code).subscribe({
          next:(res:any)=>{
            
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
 

  // onChange(event: any, item: any) {
  //   const archivoCapturado = event.target.files[0];
  //   this.arhivos.push(archivoCapturado);
  //   this.subirArchivo(item, archivoCapturado)
   
   
  // }

  // subirArchivo(item:any, img: File){
  //   console.log(item.user)
  //   this.api.addImageProfile(item.user,img)
  //     .subscribe(resp => console.log(resp))

      

  // }

    

  

  }

  

 


