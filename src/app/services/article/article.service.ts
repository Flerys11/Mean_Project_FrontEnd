import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  private apiUrl = 'http://localhost:3000/article';

  constructor(private http: HttpClient) {}

  getAllArticles(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getArticlesByBoutique(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/boutique/${id}`);
  }

  createArticle(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateArticle(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteArticle(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
