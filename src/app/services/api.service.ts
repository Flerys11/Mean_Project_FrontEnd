import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url backend
  ip: string = 'http://localhost:3000/';

  //login
  loginUrl = 'auth/login';
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  UrlLogin(){
    return this.ip + this.loginUrl;
  }




}
