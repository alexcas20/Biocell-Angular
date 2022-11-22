import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginI } from 'src/app/models/login.interface';
import { RegisterI } from 'src/app/models/response.interface';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public myForm!:FormGroup;


 

  constructor(private fb:FormBuilder, private ruta:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
    this.checkLocalStorage();
  }

  createMyForm():FormGroup{
    return this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required]
    });
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.ruta.navigate(['dashboard']);
    } else {
      this.ruta.navigate(['']);
    }
  }
  

  get f():any{
    return this.myForm.controls;
  }

  onLogin(form:LoginI){

   console.log('Logueo correcto');
      this.api.login(form).subscribe(resp => {
        
        let dataResponse:RegisterI = resp;
        Swal.fire({
      
          title: 'Bienvenido ',
          html: 'Sera redirigido en un momento.',
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        console.log(resp);
        console.log('dataResponse: ', dataResponse)
  
        if(dataResponse.status){
           localStorage.setItem('token',dataResponse.result.token)
           this.ruta.navigate(['dashboard'])
          
  
          console.log('token: ',dataResponse.result);
          console.log('token: ', dataResponse.status);
  
        }
      })

    })
    
  }


  // login(form:string){
  //   console.log(this.user);
  //   console.log(this.pass)

  //     if(this.user === 'jacs' && this.pass === '12345'){
  //      let userL = document.getElementById(form)?.setAttribute('routerLink', '/dashboard');
  //       console.log(userL)
  //     }
  //     else{
  //       alert('Datos incorrectos')
  //     }
  // }
}
