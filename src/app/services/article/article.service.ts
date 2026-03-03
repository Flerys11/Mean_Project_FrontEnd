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

  createArticle(article: Article): Observable<Article> {
    const articleData = {
      ...article,
      photo: article.photo || []
    };
    return this.http.post<Article>(this.apiUrl, articleData);
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    const articleData = {
      ...article,
      photo: article.photo || []
    };
    return this.http.put<Article>(`${this.apiUrl}/${id}`, articleData);
  }


  deleteArticle(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
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
