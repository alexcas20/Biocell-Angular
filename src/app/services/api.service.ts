import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  Register  from '../models/register.interface';
import { RegisterI } from '../models/response.interface';
import { LoginI } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:5000/lab'

  constructor(private http:HttpClient) { }

  login(form:LoginI):Observable<RegisterI>{
    let direccion = `${this.url}/auth`
    return this.http.post<RegisterI>(direccion,form)
  }

  postData(form:Register ):Observable<Register>{
    let direccion = `${this.url}/registerUser`;
    return this.http.post<Register>(direccion,form);
  }

  getUsers():Observable<any>{
    let direccion = `${this.url}/allUsers`;
    return this.http.get(direccion);
  }

  putUser(code:any, form:Register):Observable<Register>{
    let direccion = `${this.url}/editUser/${code}`;
    return this.http.put<Register>(direccion, form)
  }

  deleteUser(code:any){
    let direccion = `${this.url}/Delete/${code}`;
    return this.http.delete(direccion,code)
  }

  postPaciente(form:Register):Observable<any>{
    let direccion = `${this.url}/addPaciente`;
    return this.http.post<Register>(direccion,form)
  }

  getPacientes():Observable<any>{
    let direccion = `${this.url}/allPacientes`;
    return this.http.get(direccion);
  }


}
