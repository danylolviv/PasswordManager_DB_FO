import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5028/api';

  constructor(private http: HttpClient) { }

  login(username: string | undefined, password: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/Auth/Login`;
    localStorage.setItem('password', password || 'none');
    localStorage.setItem('username', username || 'none');

    console.log("servie: ", username);

    return this.http.post<{ token: string }>(url, { username, password })
      .pipe(
        tap((response: any) => {
          console.log("response", response.token)
          if (response.jwt) {
            localStorage.setItem('token', response.jwt);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(username: string | undefined, password: string | undefined, confirmPassword: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/Auth/CreateUser`;
    return this.http.post<{ token: string }>(url, { username, password })
      // .pipe(
      //   tap(response => {
      //     if (response.token) {
      //       localStorage.setItem('token', response.token);
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   })
      // );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
