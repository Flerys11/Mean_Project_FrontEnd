import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getStats(type: 'jour' | 'mois', id_boutique: string): Observable<any> {

    const params = new HttpParams()
      .set('id_boutique', id_boutique);

    return this.http.get(
      this.url(`/${type}`),
      {params}
    );
  }

  getStatsAnnee(id_boutique: string): Observable<any> {

    const params = new HttpParams()
      .set('id_boutique', id_boutique);

    return this.http.get(
      this.url(`/annee`),
      { params }
    );
  }

  getStatsByArticle(type: 'jour' | 'mois', idArticle: string): Observable<any> {
    return this.http.get(this.url(`/${type}/${idArticle}`));
  }

  getStatsByArticleAnnee(idArticle: string): Observable<any> {
    return this.http.get(this.url(`/annee/${idArticle}`));
  }

}
