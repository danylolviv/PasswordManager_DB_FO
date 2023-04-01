import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PasswordUnitModel} from "../../auth/Model/PasswordUnitModel";

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  private apiUrl = 'http://127.0.0.1:5000';


  constructor(private http: HttpClient) {}

  getUnits(unit: PasswordUnitModel): Observable<PasswordUnitModel> { // masterpassword username
    const url = `${this.apiUrl}/get`;
    console.log("get", unit);
    return this.http.post<PasswordUnitModel>(url, unit);
  }


  createUnit(unit: PasswordUnitModel): Observable<PasswordUnitModel> { // masterpassword all
    const url = `${this.apiUrl}/add`;
    console.log("unit", unit);
    return this.http.post<PasswordUnitModel>(url, unit);
  }

  updateUnit(unit: PasswordUnitModel): Observable<PasswordUnitModel> {  // masterpassword all
    const url = `${this.apiUrl}/edit`;
    return this.http.put<PasswordUnitModel>(url, unit);
  }

  deleteUniT(unit: PasswordUnitModel): Observable<PasswordUnitModel> { // id and username
    const url = `${this.apiUrl}/delete`;
    let usernameFromLocal =  localStorage.getItem('username');
    let arr =[unit.id, usernameFromLocal]
    console.log("get", unit);
    return this.http.post<PasswordUnitModel>(url, arr);
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
