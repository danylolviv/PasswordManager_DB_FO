import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PasswordUnitModel} from "../../auth/Model/PasswordUnitModel";

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  private apiUrl = 'http://localhost:3000/units';

  constructor(private http: HttpClient) {}

  getUnits(): Observable<PasswordUnitModel[]> {
    return this.http.get<PasswordUnitModel[]>(this.apiUrl);
  }

  createUnit(unit: PasswordUnitModel): Observable<PasswordUnitModel> {
    return this.http.post<PasswordUnitModel>(this.apiUrl, unit);
  }

  updateUnit(unit: PasswordUnitModel): Observable<PasswordUnitModel> {
    const url = `${this.apiUrl}/${unit.id}`;
    return this.http.put<PasswordUnitModel>(url, unit);
  }

  deleteUnit(id: string): Observable<PasswordUnitModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<PasswordUnitModel>(url);
  }

  generatePassword(): string {
    const length = 12;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[];:<>,.?/';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    return password;
  }
}
