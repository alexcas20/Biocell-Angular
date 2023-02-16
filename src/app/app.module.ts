import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';


import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './pages/dialog/dialog.component'

import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'
import { MatDialogModule} from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import localeEs from '@angular/common/locales/es-MX'



import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule, 
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SweetAlert2Module
  ],
  providers: [{
    provide:LOCALE_ID, useValue : 'es-MX'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
