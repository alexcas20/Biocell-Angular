import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginI } from '../../models/login.interface';
import { RegisterI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Code
    nRandom = Math.round(Math.random()*100)

  registerForm : FormGroup = this.fb.group({
    code: ['LB'+this.nRandom],
    user: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  constructor(private fb: FormBuilder,
    private loginService: loginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registrarUser(form: LoginI){
    console.log(this.registerForm.value);
    this.loginService.registroUserLogin(form)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire(
          'Exito!',
          'Usuario creado!',
          'success'
        )
        this.router.navigateByUrl('login')
      },
      err => {
        console.log(err)
        Swal.fire(
          'Error',
          err.error.message,
          'error'
        )
      })
  }

}
