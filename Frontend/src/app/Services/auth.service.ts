import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api';

  private tokenKey = 'auth-token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  singin(user:any){
    return this.http.post(`${this.URL}/user/singin`,user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
 login(userName: string, pass: string): Observable<any> {
  
  return this.http.post(`${this.URL}/user/login`, { userName, pass }).pipe(
    tap((res: any) => {
      localStorage.setItem(this.tokenKey, res.token);
      
    })
  );
}



getToken() {
  return localStorage.getItem(this.tokenKey);
}

getRole(): number | null {
  const token = this.getToken();
 
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
  
}

logout() {
  localStorage.removeItem(this.tokenKey);
  this.router.navigate(['/login']);
}

isLoggedIn() {
  return !!this.getToken();
}

}

