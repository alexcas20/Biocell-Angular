import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { RegisterI } from '../models/register.interface';
import { loginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:3000/lab';
 

  constructor(private http:HttpClient, private loginService : loginService) { }

 

  register(user:string, password:string,rol:string,status:string):Observable<RegisterI>{
    let direccion = `${this.url}/registerUser`
    return this.http.post<RegisterI>(direccion,{user,password,rol,status})
  }

  login(form:LoginI):Observable<ResponseI>{
    let direccion = `${this.url}/auth`
    return this.http.post<ResponseI>(direccion,form)
  }


  serviceGetUsers():Observable<any>{
   
    let direccion = `${this.url}/allUsers`;
    return this.http.get(direccion)

  
  }

  putUser(code: any, form: Register): Observable<Register> {
    let direccion = `${this.url}/editUser/${code}`;
    return this.http.put<Register>(direccion, form);
  }

  deleteUser(code: any) {
    let direccion = `${this.url}/Delete/${code}`;
    return this.http.delete(direccion, code);
  }

  postPaciente(form: Register): Observable<any> {
    let direccion = `${this.url}/addPaciente`;
    return this.http.post<Register>(direccion, form);
  }

  getPacientes(): Observable<any> {
    let direccion = `${this.url}/allPacientes`;
    return this.http.get(direccion);
  }

  deletePaciente(code: any) {
    let direccion = `${this.url}/deletePaciente/${code}`;
    return this.http.delete(direccion, code);
  }

  getMedicos(): Observable<any> {
    let direccion = `${this.url}/allMedicos`;
    return this.http.get(direccion);
  }

  postMedicos(form: Register): Observable<any> {
    let direccion = `${this.url}/addMedico`;
    return this.http.post<Register>(direccion, form);
  }
}
