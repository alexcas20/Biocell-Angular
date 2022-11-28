import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';

const routes: Routes = [

 {path: 'dashboard', component: PagesComponent,
    children: [
      {path: '', component:DashboardComponent},
      {path: 'usuarios', component:UsuariosComponent},
      {path: 'pacientes', component:PacientesComponent},
      {path:'medicos',component:MedicosComponent}
    ]
  }
]

@NgModule({
  declarations: [], //posiblemente eliminar
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
