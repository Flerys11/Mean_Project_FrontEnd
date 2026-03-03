import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {StatArticleComponent} from "./stat-article/stat-article.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Login', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
  {
    path: 'stat-article',
    component: StatArticleComponent,
    data: {
      title: 'Statistiques par Article',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Statistiques Article' },
      ],
    },
  },
];
