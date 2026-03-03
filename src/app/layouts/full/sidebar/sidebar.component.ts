import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { navItems } from './sidebar-data';
import { CommonModule } from '@angular/common';
import {AppNavItemComponent} from "./nav-item/nav-item.component";
import {NavItem} from "./nav-item/nav-item";
import {BrandingComponent} from "./branding.component";
import {TablerIconsModule} from "angular-tabler-icons";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AppNavItemComponent, BrandingComponent, TablerIconsModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [];
  role: string | null = null;

  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  ngOnInit(): void {
    const stored = localStorage.getItem('authData');
    if (stored) this.role = JSON.parse(stored).role;

    // Filtrage récursif par rôle
    this.navItems = navItems
      .map(item => this.filterByRole(item))
      .filter(item => !!item) as NavItem[];
  }

  private filterByRole(item: NavItem): NavItem | null {
    // Si l'item a un tableau roles et que le rôle actuel n'est pas inclus → on exclut
    if (item.roles && this.role && !item.roles.includes(this.role)) {
      return null;
    }

    const newItem = { ...item };

    // Filtrage des enfants si existants
    if (item.children && item.children.length) {
      newItem.children = item.children
        .map(child => this.filterByRole(child))
        .filter(child => !!child) as NavItem[];
    }

    return newItem;
  }
}
