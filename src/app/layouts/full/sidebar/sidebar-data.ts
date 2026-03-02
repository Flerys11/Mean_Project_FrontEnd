import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Acceuil',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Gestion du Boutique',
  },

/*  {
    displayName: 'Forms',
    iconName: 'rosette',
    bgcolor: 'accent',
    route: '/ui-components/forms',
  },*/
  {
    displayName: 'Boutiques',
    iconName: 'list',
    bgcolor: 'warning',
    route: '/ui-components/boutiques',
  },
  {
    displayName: 'Articles',
    iconName: 'list',
    bgcolor: 'warning',
    route: '/ui-components/articles',
  },
  {
    displayName: 'Commandes',
    iconName: 'list',
    bgcolor: 'success',
    route: '/ui-components/commande',
  },
  {
    displayName: 'Categories',
    iconName: 'list',
    bgcolor: 'success',
    route: '/ui-components/lists',
  },

];
