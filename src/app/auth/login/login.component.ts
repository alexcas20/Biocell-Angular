import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginI } from 'src/app/models/login.interface';
import { RegisterI } from 'src/app/models/response.interface';
import { ApiService } from 'src/app/services/api.service';
import { loginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ruta: Router,
    private loginService: loginService
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
    this.checkLocalStorage();
  }

  createMyForm(): FormGroup {
    return this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.ruta.navigate(['dashboard']);
    } else {
      this.ruta.navigate(['']);
    }
  }

  get f(): any {
    return this.myForm.controls;
  }

  onLogin(form: LoginI) {
    console.log('Logueo correcto');
    this.loginService.login(form).subscribe(
      (resp) => {
        let dataResponse: RegisterI = resp;
        Swal.fire({
          title: 'Bienvenido ',
          html: 'Sera redirigido en un momento.',
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
          }

          if (dataResponse.status) {
            localStorage.setItem('token', dataResponse.result.token);
            this.ruta.navigate(['dashboard']);
          }
        });
      },
      (err) => {
        Swal.fire('Error', err.error.result.msg, 'error');
      }
    );
  }
}
