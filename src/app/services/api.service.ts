import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url backend
  // ip: string = 'http://localhost:3000/';

  ip: string = 'https://mean-backend-hjc6.onrender.com/';

  //login
  loginUrl = 'auth/login';
  registerUrl = 'auth/inscription';
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  UrlLogin(){
    return this.ip + this.loginUrl;
  }

  UrlRegister(){
    return this.ip + this.registerUrl;
  }




}
