import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import RegistroPaciente from '../models/registerPaciente.interface';
import RegistroMedico from '../models/registerMedicos.interface';
import registarExamen from '../models/registrarExamen.interface';
import registrarExamen from '../models/registrarExamen.interface';
import Register from '../models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _auth: any | undefined;
  private _mDicos: any;

  get auth(): any {
    return { ...this._auth! };
  }

  get mDicos(): any {
    return { ...this._mDicos! };
  }

  private url: string = 'http://127.0.0.1:5000/lab';
  private urlPacientes: string = 'http://127.0.0.1:5000/lab';
  private urlMedicos: string = 'http://127.0.0.1:5000/lab';
  constructor(private http: HttpClient) {}

 
  

  

  getUsers(): Observable<any> {
    let direccion = `${this.url}/allUsers`;
    return this.http.get(direccion);
  }

  putUser(user: any, form: Register): Observable<Register> {
    let direccion = `${this.url}/editUser/${user}`;
    return this.http.put<Register>(direccion,form);
  }

  deleteUser(code: any) {
    let direccion = `${this.url}/deleteUser/${code}`;
    return this.http.delete(direccion, code);
  }

  postPaciente(form: RegistroPaciente): Observable<RegistroPaciente> {
    let direccion = `${this.urlPacientes}/addPaciente`;
    return this.http.post<RegistroPaciente>(direccion, form);
  }

  getPacientes(): Observable<any> {
    let direccion = `${this.urlPacientes}/allPacientes`;
    return this.http.get(direccion);
  }

  updatePaciente(
    folio: any,
    form: RegistroPaciente
  ): Observable<RegistroPaciente> {
    let direccion = `${this.urlPacientes}/updatePaciente/${folio}`;
    return this.http.put<RegistroPaciente>(direccion, form);
  }

  deletePaciente(folio: any) {
    let direccion = `${this.urlPacientes}/deletePaciente/${folio}`;
    return this.http.delete(direccion, folio);
  }

  getMedicos(): Observable<any> {
    let direccion = `${this.urlMedicos}/allMedicos`;
    return this.http
      .get(direccion)
      .pipe(tap((medicos) => (this._mDicos = medicos)));
  }

  postMedicos(form: RegistroMedico): Observable<RegistroMedico> {
    let direccion = `${this.urlMedicos}/addMedico`;
    return this.http.post<RegistroMedico>(direccion, form);
  }

  putMedico(folio: any, form: RegistroMedico): Observable<RegistroMedico> {
    let direccion = `${this.urlMedicos}/updateMedico/${folio}`;
    return this.http.put<RegistroMedico>(direccion, form);
  }

  deleteMedico(folio: any) {
    let direccion = `${this.urlMedicos}/deleteMedico/${folio}`;
    return this.http.delete(direccion, folio);
  }

  registarExamen(form: registarExamen): Observable<registarExamen> {
    let direccion = `${this.urlMedicos}/nuevoExamen`;
    return this.http.post<registarExamen>(direccion, form);
  }

  getExamenes(): Observable<any> {
    let direccion = `${this.urlMedicos}/datosExamenes`;
    return this.http.get(direccion);
  }

  agregarExamen(form: registrarExamen): Observable<registarExamen> {
    let direccion = `${this.urlMedicos}/addExamen/${form.folio}`;
    return this.http.put<registrarExamen>(direccion, form);
  }

  obtenerExamenFolio(folio: any): Observable<any> {
    let direccion = `${this.url}/obtenerExamenes/${folio}`;
    return this.http.get<any>(direccion);
  }

  postPacienteExamen(form: RegistroPaciente): Observable<RegistroPaciente> {
    let direccion = `${this.urlPacientes}/addPacienteExamen`;
    return this.http.post<RegistroPaciente>(direccion, form);
  }

  getDatosMedico(nombre: any): Observable<any> {
    let direccion = `${this.url}/datosMedico/${nombre}`;
    return this.http.get<any>(direccion);
  }

  // FinalizarExamen
  finalExamen(folio: any): Observable<any> {
    let direccion = `${this.url}/finalizarExamen/${folio}`;
    return this.http.put<any>(direccion, folio);
  }

  getTiposExamenes(): Observable<any> {
    let direccion = `${this.urlMedicos}/tiposExamenes`;
    return this.http.get(direccion);
  }

  getEstudios(examen: any): Observable<any> {
    let direccion = `${this.url}/estudiosExamen/${examen}`;
    return this.http.get(direccion, examen);
  }

  getParametros(examen: string, estudio: string): Observable<any> {
    let direccion = `${this.url}/parametrosEstudio/${examen}/${estudio}`;
    return this.http.get(direccion)
      
   }

   borrarExamen(folio:string): Observable<any>{
    let direccion = `${this.url}/borrarExamen/${folio}`;
    return this.http.delete(direccion)
   }

   borrarExamenes(): Observable<any>{
    let direccion = `${this.url}/borrarExamenes`;
    return this.http.delete(direccion)
   }

   eliminarPacientes(): Observable<any>{
    let direccion = `${this.url}/deletePacientes`;
    return this.http.delete(direccion)
   }

   addImageProfile(user:any,img: File): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData(); 
    formData.append('profile_image', img)
    let direccion = `${this.url}/uploadImage/${user}`
    return this.http.put<any>(direccion, formData, {
      headers
    })
   }

   borrarPacienteExamen(folio:any){
    let direccion = `${this.url}/borrarPacienteExamen/${folio}`;
      return this.http.delete(direccion)
   }
   
}
