import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LastRouteService {
  private lastRoute: string = '/dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes('login')) {
          this.lastRoute = event.url;
          localStorage.setItem('lastRoute', this.lastRoute);
        }
      }
    });
  }

  getLastRoute(): string {
    return localStorage.getItem('lastRoute') || this.lastRoute;
  }
}
