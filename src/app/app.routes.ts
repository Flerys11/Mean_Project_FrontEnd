import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {AuthGuard} from "./services/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
    ],
  },
  {
    path: 'client',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/client/client.routes').then(
            (m) => m.ClientRoutes
          ),
      },
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.routes').then(
        (m) => m.AuthenticationRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
