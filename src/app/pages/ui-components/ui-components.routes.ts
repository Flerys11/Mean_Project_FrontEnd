import { Routes } from '@angular/router';

// ui
import { AppListsComponent } from './lists/lists.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { CommandeComponent } from './commande/commande.component';
import {CategorieComponent} from "./categorie/categorie.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'commande',
        component: CommandeComponent,
      },
      {
        path: 'categorie',
        component: CategorieComponent,
      },
    ],
  },
];
