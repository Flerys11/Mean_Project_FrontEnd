import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface LoginResponse {
  utilisateur: {
    _id: string;
    boutique: {
      _id: string;
      nom: string;
    };
    role: string;
  };
  token: string;
}

export interface AuthData {
  id: string;
  id_boutique: string;
  nom_boutique: string;
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authDataSubject = new BehaviorSubject<AuthData | null>(null);
  public authData$ = this.authDataSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {
    const stored = localStorage.getItem('authData');
    if (stored) {
      this.authDataSubject.next(JSON.parse(stored));
    }
  }

  login(email: string, mot_de_passe: string): Observable<AuthData> {
    const loginUrl = this.apiService.UrlLogin();
    const body = { email, mot_de_passe };
    return this.http.post<LoginResponse>(`${loginUrl}`, body).pipe(
      map(response => {
        const authData: AuthData = {
          id: response.utilisateur._id,
          id_boutique: response.utilisateur.boutique._id,
          nom_boutique: response.utilisateur.boutique.nom,
          token: response.token,
          role: response.utilisateur.role
        };


        localStorage.setItem('authData', JSON.stringify(authData));
        localStorage.setItem('token', authData.token);

        this.authDataSubject.next(authData);

        return authData;
      })
    );
  }

  logout() {
    localStorage.removeItem('authData');
    localStorage.removeItem('token');
    this.authDataSubject.next(null);
  }

  getAuthData(): AuthData | null {
    return this.authDataSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}

