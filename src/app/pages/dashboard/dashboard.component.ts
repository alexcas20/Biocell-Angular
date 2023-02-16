import { Component, OnInit } from '@angular/core';
import { tap, filter } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService) { }

  totalExamenes:any;
  examenesActivos: any[] = [] ;
  totalExamenesActivos: any;
  totalPacientes: any[] = [];
  titulo:string = "Dashboard"

  


  ngOnInit(): void {
    this.api.getExamenes()
      .pipe(
        tap( respActive => {
          this.examenesActivos = respActive
          console.log(this.examenesActivos);
          const activos = this.examenesActivos.filter(el => el.estado === 'activo');
          console.log("activos:" ,activos);
          this.totalExamenesActivos = activos;

        } )
      )
      .subscribe(resp => {
        this.totalExamenes = resp;
        console.log(resp)
      })

      this.api.getPacientes()
        .subscribe(resp => this.totalPacientes = resp )

    



    

  

  }

}
