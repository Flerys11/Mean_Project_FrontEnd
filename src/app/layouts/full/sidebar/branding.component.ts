import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding d-flex align-items-center">
      <a class="d-flex align-items-center text-reset text-decoration-none">
        <span class="brand-text">
          <span class="text-green">m1p13mean-</span>
          <span class="text-yellow">Flerys-Jimmy</span>
        </span>
      </a>
    </div>
  `,
})

export class BrandingComponent {
  constructor() {}
}
