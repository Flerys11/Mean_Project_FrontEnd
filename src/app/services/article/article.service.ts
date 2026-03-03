import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "../api.service";

export interface Article {
  _id: string;
  nom_article: string;
  prix: number;
  description: string;
  photo: string[];
  id_boutique: any;
  id_categorie: any;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private base = 'article';

  constructor(private http: HttpClient, private api: ApiService) {}

  getAllArticles(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.api.ip}${this.base}?page=${page}&limit=${limit}`);
  }

  getArticlesByBoutique(id: string): Observable<any> {
    return this.http.get(`${this.api.ip}/boutique/${id}`);
  }

  createArticle(data: any) {
    return this.http.post(this.api.ip, data);
  }

  updateArticle(id: string, data: any) {
    return this.http.put(`${this.api.ip}${this.base}/${id}`, data);
  }

  deleteArticle(id: string) {
    return this.http.delete(`${this.api.ip}${this.base}/${id}`);
  }
}
