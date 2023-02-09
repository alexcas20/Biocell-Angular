import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginI } from '../../models/login.interface';
import { RegisterI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup = this.fb.group({
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
        this.router.navigateByUrl('login')
      })
  }

}
