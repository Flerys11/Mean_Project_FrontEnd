import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  { navCap: 'Acceuil' },

  { displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'accent',
    route: '/dashboard',
    roles: ['USER']
  },

  { displayName: 'Statistique article',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard/stat-article',
    roles: ['USER']
  },

  { navCap: 'Gestion du Boutique' },


  { displayName: 'Boutiques', iconName: 'list', bgcolor: 'primary', route: '/ui-components/boutiques', roles: ['ADMIN'] },
  { displayName: 'Articles', iconName: 'list', bgcolor: 'success', route: '/ui-components/articles', roles: ['USER'] },
  { displayName: 'Commandes', iconName: 'list', bgcolor: 'primary', route: '/ui-components/commande', roles: ['USER'] },
  { displayName: 'Categories', iconName: 'list', bgcolor: 'success', route: '/ui-components/categorie', roles: ['ADMIN'] },
];
