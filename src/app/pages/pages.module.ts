import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {PacientesComponent} from './pacientes/pacientes.component';
import { DialogPacientesComponent } from './dialog-pacientes/dialog-pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { DialogMedicosComponent } from './dialog-medicos/dialog-medicos.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { DialogExamenesComponent } from './dialog-examenes/dialog-examenes.component';
import { DialogBuscarPacienteComponent } from './dialog-buscar-paciente/dialog-buscar-paciente.component';
import { DialogBuscarMedicoComponent } from './dialog-buscar-medico/dialog-buscar-medico.component'
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { GeneroPipe } from '../pipes/genero.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    PacientesComponent,
    DialogPacientesComponent,
    MedicosComponent,
    DialogMedicosComponent,
    ExamenesComponent,
    DialogExamenesComponent,
    DialogBuscarPacienteComponent,
    DialogBuscarMedicoComponent,
    GeneroPipe
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule,
    SharedModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    MatFormFieldModule,
  ],
  exports:[
    DashboardComponent,
    UsuariosComponent,
    PacientesComponent,

  ]
})
export class PagesModule { }
