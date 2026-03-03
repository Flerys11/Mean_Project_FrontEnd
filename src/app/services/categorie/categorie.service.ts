import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

export interface Categorie {
  _id: string;
  nom: string;
  valeur: number;
}

@Injectable({ providedIn: 'root' })
export class CategorieService {

  private base = 'categorie';

  constructor(private http: HttpClient, private api : ApiService) { }

  getAll(page = 1, limit = 50) {
    return this.http.get(`${this.api.ip}${this.base}?page=${page}&limit=${limit}`);
  }

  create(data: any) {
    return this.http.post(this.api.ip + this.base, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.api.ip}${this.base}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.api.ip}${this.base}/${id}`);
  }
}
