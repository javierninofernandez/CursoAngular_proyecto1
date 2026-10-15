// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse { 
  id: string;
  username: string;
  roles: string[];
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://b8231233-8260-4cfa-8478-f5fbedf67a96.mock.pstmn.io'  //'http://localhost:8080/api';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.accessToken);
        })
      );
  }

  // login(credentials: LoginRequest): Observable<LoginResponse> {
  //   return this.http
  //     .post<LoginResponse>(
  //       `${this.apiUrl}/auth/login`,
  //       credentials
  //     )
  //     .pipe(
  //       tap(response => {
  //         localStorage.setItem(
  //           'current_user',
  //           JSON.stringify(response)
  //         );
  //       })
  //     );
  // }

  logout(): void {
    localStorage.removeItem('access_token');
    //localStorage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
    //return !!localStorage.getItem('current_user');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }  

  getUser(): LoginResponse | null {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) as LoginResponse : null;
  }  

  hasRole(role: string): boolean {
    return this.getUser()?.roles.includes(role) ?? false;
  }
}
