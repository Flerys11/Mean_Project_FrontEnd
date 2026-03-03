import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {finalize} from "rxjs";
import {LastRouteService} from "../../../services/last-route.service";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: '../side-login/side-login-component.scss'
})
export class LoginAdminComponent {
  isLoading = false;
  errorMessage = '';

  form = new FormGroup({
    email: new FormControl('Admin@gmail.com', [Validators.required, Validators.email]),
    mot_de_passe: new FormControl('Admin2026', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private lastRouteService : LastRouteService,
  ) { }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, mot_de_passe } = this.form.value;

    this.authService.login(email!, mot_de_passe!)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {

          const stored = localStorage.getItem('authData');

          if (!stored) {
            this.router.navigate(['/authentication/login']);
            return;
          }

          const role = JSON.parse(stored).role;

          if (role === 'ADMIN') {
            this.router.navigate(['/ui-components/boutiques']);
          } else if (role === 'USER') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Erreur de connexion. Vérifiez vos identifiants.';
        }
      });
  }
}
