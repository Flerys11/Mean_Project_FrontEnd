import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

export interface StatCommande {
  _id: string;
  chiffreAffaire: number;
  totalCommandes: number;
}

@Injectable({ providedIn: 'root' })
export class StatCommandeService {
  private base = 'commande/stats';

  constructor(private http: HttpClient, private api: ApiService) {}

  private url(path = ''): string {
    return `${this.api.ip}${this.base}${path}`;
  }

  getStats(type: 'jour' | 'mois'): Observable<any> {
    return this.http.get(this.url(`/${type}`));
  }

  getStatsAnnee(): Observable<any> {
    return this.http.get(this.url(`/annee`));
  }

  getStatsByArticle(type: 'jour' | 'mois', idArticle: string): Observable<any> {
    return this.http.get(this.url(`/${type}/${idArticle}`));
  }

  getStatsByArticleAnnee(idArticle: string): Observable<any> {
    return this.http.get(this.url(`/annee/${idArticle}`));
  }

}
