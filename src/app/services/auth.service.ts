import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    return !!localStorage.getItem('secret');
  }

  getToken(): string | null {
    return localStorage.getItem('secret');
  }

  logout(): void {
    localStorage.removeItem('secret');
  }
}