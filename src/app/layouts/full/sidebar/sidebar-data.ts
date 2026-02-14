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

  {
    displayName: 'Forms',
    iconName: 'rosette',
    bgcolor: 'accent',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'poker-chip',
    bgcolor: 'warning',
    route: '/ui-components/tables',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    bgcolor: 'success',
    route: '/ui-components/lists',
  },

];
