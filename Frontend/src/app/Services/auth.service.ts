import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI = 'http://localhost:3000/api';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router,
    private http: HttpClient
  ) {
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
       
        this.isAuthenticatedSubject.next(true);
      })
    );
    console.log(data);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.API_URI}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(tap(() => localStorage.clear()));
    
    
  }
  
}

