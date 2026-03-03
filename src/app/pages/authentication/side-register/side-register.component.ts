import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { BoutiqueService } from 'src/app/services/boutique/boutique.service';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './side-register.component.html'
})
export class AppSideRegisterComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';
  loading = false;
  boutiques: any[] = [];
  type_boutiques: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private boutiqueService: BoutiqueService,
    private location: Location
  ) {

    this.form = this.fb.group({
      nom_boutique: ['', Validators.required],
      type_boutique: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ]
    });
  }



  ngOnInit() {
    this.loadBoutiques();
    this.loadTypeBoutiques()
  }

  goBack() {
    this.location.back();
  }

  loadBoutiques() {
    this.boutiqueService.getAll().subscribe((res: any) => {
      this.boutiques = res.docs || res.data;
    });
  }

  loadTypeBoutiques() {
    this.boutiqueService.getAllType().subscribe((res: any) => {
      this.type_boutiques = res.docs || res;
    });
  }

  submit() {

    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    console.log('Form values:', this.form.value);

    this.authService.register(this.form.value)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Inscription réussie');
          this.goBack();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Erreur serveur';
        }
      });
  }
}
