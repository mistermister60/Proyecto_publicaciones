import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { User } from '../Interfaces/user';
import { throwError, Observable, retry, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getOne(id: string, url: string) {
      return this.http.get(`${this.API_URI}` + url + `/${id}`);
  }
   delete(id: number, url: string) {
    return this.http.delete(`${this.API_URI}` + url + `/${id}`);
  }
update(id: string | number, updated: any, url: string): Observable<any> {
    return this.http.post(`${this.API_URI}` + url + `/${id}`, updated);
  }

save<T>(data: T, url: string): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post(`${this.API_URI}${url}`, JSON.stringify(data), { headers })
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
}
      guardar(Usuario: User, url: string) {
      let headers = new HttpHeaders();
      headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(`${this.API_URI}` + url , JSON.stringify(Usuario), {headers: headers})
      .pipe(
      retry(1),
      catchError(this.errorHandl)
      );
      }
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  getDropListColonias():Observable<any[]>{
return this.http.get<any>(this.API_URI+'/colonia')
}
  getDropListEmpresa():Observable<any[]>{
return this.http.get<any>(this.API_URI+'/empresa')
}
  getDropListUsuario():Observable<any[]>{
return this.http.get<any>(this.API_URI+'/usuario')
}
  getDropListServicio():Observable<any[]>{
return this.http.get<any>(this.API_URI+'/servicio')
}
  getDropListDireccionLugar():Observable<any[]>{
return this.http.get<any>(this.API_URI+'/direccionlugar')
}
}
