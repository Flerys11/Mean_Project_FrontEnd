import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface CommandeArticle {
  article: any;
  quantite: number;
}

export interface Commande {
  _id: string;
  nom_client: string;
  contact_client: string;
  adresse_client: string;
  articles: CommandeArticle[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CommandeService {

  private base = 'commande';

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {}

  private url(path = ''): string {
    return `${this.api.ip}${this.base}${path}`;
  }

  getAll(): Observable<any> {
    return this.http.get(this.url(''));
  }

  validerCommande(id: string): Observable<any> {
    return this.http.put(this.url(`/status/${id}`), { status: 'valide' });
  }

  annulerCommande(id: string): Observable<any> {
    return this.http.put(this.url(`/status/${id}`), { status: 'annule' });
  }
}
