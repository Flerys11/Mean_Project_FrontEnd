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
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  isLoading = false;
  errorMessage = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    mot_de_passe: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService
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

    this.authService.login(email!, mot_de_passe!).subscribe({
      next: (authData) => {
        // console.log('Authentification réussie:', authData);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erreur d\'authentification:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      }
    });
  }
}
