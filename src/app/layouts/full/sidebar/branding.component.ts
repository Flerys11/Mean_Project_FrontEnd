import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding d-flex align-items-center">
      <a [routerLink]="['/']" class="d-flex align-items-center text-reset text-decoration-none">
        <img
          src="./assets/images/logos/dark-logo.svg"
          class="logo-small"
          alt="logo"
        />
        <span class="brand-text">
          <span class="text-green">La</span>
          <span class="text-yellow">City</span>
        </span>
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
