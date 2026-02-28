import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BoutiqueService {

  private apiUrl = 'http://localhost:3000/boutique';

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 50) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
