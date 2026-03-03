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

  getAllArticlesStock(id_boutique: string): Observable<any> {
    return this.http.get(`${this.api.ip}stock/${id_boutique}`);
  }

  getArticlesByBoutique(id: string): Observable<any> {
    return this.http.get(`${this.api.ip}${this.base}/boutique/${id}`);
  }

  AddStock(data: any) {
    return this.http.post(this.api.ip + 'stock', data);
  }

  createArticle(article: Article): Observable<Article> {
    const articleData = {
      ...article,
      photo: article.photo || []
    };
    return this.http.post<Article>(this.api.ip + this.base, articleData);
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    const articleData = {
      ...article,
      photo: article.photo || []
    };
    return this.http.put<Article>(`${this.api.ip}${this.base}/${id}`, articleData);
  }


  deleteArticle(id: string) {
    return this.http.delete(`${this.api.ip}${this.base}/${id}`);
  }

  filesToBase64(files: FileList): Promise<string[]> {
    const promises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      promises.push(this.fileToBase64(file));
    }

    return Promise.all(promises);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
