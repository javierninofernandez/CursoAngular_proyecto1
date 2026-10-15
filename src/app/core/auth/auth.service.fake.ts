/* version de prueba para usar array interno que simula/reemplaza las llamadas a un API real para la autenticación */
// auth.service.fake.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

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

interface MockUser extends LoginResponse {
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Usuarios ficticios
  private readonly mockUsers: MockUser[] = [
    {
      id: '1',
      username: 'admin',
      password: '1234',
      roles: ['ADMIN', 'USER'],
      accessToken: 'fake-token-admin'
    },
    {
      id: '2',
      username: 'usuario',
      password: '1234',
      roles: ['USER'],
      accessToken: 'fake-token-usuario'
    },
    {
      id: '3',
      username: 'test',
      password: 'test',
      roles: ['USER'],
      accessToken: 'fake-token-test'
    }
  ];

  login(credentials: LoginRequest): Observable<LoginResponse> {

    const user = this.mockUsers.find(
      u =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      return throwError(
        () => new Error('Usuario o contraseña incorrectos')
      );
    }

    // No devolvemos la contraseña
    const response: LoginResponse = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      accessToken: user.accessToken
    };

    return of(response).pipe(
      delay(500),
      tap(response => {
        localStorage.setItem(
          'access_token',
          response.accessToken
        );

        // Guardar información del usuario autenticado
        localStorage.setItem(
          'current_user',
          JSON.stringify({
            id: response.id,
            username: response.username,
            roles: response.roles
          })
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): Omit<LoginResponse, 'accessToken'> | null {
    const user = localStorage.getItem('current_user');

    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();

    return user?.roles.includes(role) ?? false;
  }
}
