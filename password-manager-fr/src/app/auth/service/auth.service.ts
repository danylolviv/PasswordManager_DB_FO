import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  login(username: string | undefined, password: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/login`;
    localStorage.setItem('password', password || 'none');
    localStorage.setItem('username', username || 'none');

    console.log("servie: ", username);

    return this.http.post<{ token: string }>(url, { username, password })
      .pipe(
        tap(response => {
          console.log("response", response.token)
          if (response.token == "1") {
            localStorage.setItem('token', response.token);
            
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(username: string | undefined, password: string | undefined, confirmPassword: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post<{ token: string }>(url, { username, password, confirmPassword })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            return true;
          } else {
            return false;
          }
        })
      );
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
