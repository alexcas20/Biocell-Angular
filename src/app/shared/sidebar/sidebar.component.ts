import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private ruta: Router) {}

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (!localStorage.getItem('token')) {
      this.ruta.navigate(['login']);
    }
  }

  logOut() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Que deseas salir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Salir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '👋',
          html: 'Hasta luego!',
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
          }
          localStorage.clear();
          this.ruta.navigate(['/login']);
        });
      } else {
        Swal.fire('Atencion!', 'Verifique sus acciones.', 'warning');
      }
    });
  }

  timerToken = setTimeout(() => {
    localStorage.removeItem('token');
    this.ngOnInit();
  }, 86400000);
}
