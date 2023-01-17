import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class loginService{

    user: any;
    userSave: any;

    url:string = 'http://localhost/';

    constructor(private http:HttpClient){ }


    loginService(form:any):Observable<Response>{
        let direccion = this.url + '/users/'
        return this.http.post<Response>(direccion,form);
    }

    

   

    
}
