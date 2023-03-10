import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterI } from '../models/response.interface';
import { LoginI } from '../models/login.interface';
import Register from '../models/register.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  private url = environment.API_URL;
  private _auth: any;

  constructor(private http: HttpClient) {}

  login(form: LoginI): Observable<RegisterI> {
    let direccion = `${this.url}/auth`;
    return this.http.post<RegisterI>(direccion, form).pipe(
      tap((auth) => {
        console.log(auth);
        this._auth = auth.result;
        console.log(this._auth);
      }),
      tap((auth) =>  {
        localStorage.setItem('user', auth.result.user)
        localStorage.setItem('rol', auth.result.rol)
      }),

    );
  }

  registrarUsuario(form: any): Observable<Register> {
    let direccion = `${this.url}/registerUserL`;
    return this.http.post<Register>(direccion, form);
  }

  registroUserLogin(form: any): Observable<Register> {
    let direccion = `${this.url}/registerUserL`;
    return this.http.post<Register>(direccion, form);
  }

}
