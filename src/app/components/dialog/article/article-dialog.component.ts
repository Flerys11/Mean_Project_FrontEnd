import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { BoutiqueService } from 'src/app/services/boutique/boutique.service';

@Component({
  standalone: true,
  selector: 'app-article-dialog',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
    <h2 mat-dialog-title>
      {{ data ? 'Modifier Article' : 'Ajouter Article' }}
    </h2>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-dialog-content>

        <mat-form-field class="w-100">
          <input matInput placeholder="Nom" formControlName="nom_article">
        </mat-form-field>

        <mat-form-field class="w-100">
          <input matInput type="number" placeholder="Prix" formControlName="prix">
        </mat-form-field>

        <mat-form-field class="w-100">
          <textarea matInput placeholder="Description" formControlName="description"></textarea>
        </mat-form-field>

        <mat-form-field class="w-100">
          <mat-label>Catégorie</mat-label>
          <mat-select formControlName="id_categorie">
            <mat-option *ngFor="let cat of categories" [value]="cat._id">
              {{ cat.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="w-100">
          <mat-label>Boutique</mat-label>
          <mat-select formControlName="id_boutique">
            <mat-option *ngFor="let b of boutiques" [value]="b._id">
              {{ b.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="close()">Annuler</button>
        <button mat-raised-button color="primary" type="submit">
          Enregistrer
        </button>
      </mat-dialog-actions>
    </form>
  `
})
export class ArticleDialogComponent {

  form: FormGroup;
  categories: any[] = [];
  boutiques: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorieService: CategorieService,
    private boutiqueService: BoutiqueService
  ) {

    this.form = this.fb.group({
      nom_article: [data?.nom_article || '', Validators.required],
      prix: [data?.prix || '', Validators.required],
      description: [data?.description || '', Validators.required],
      id_categorie: [data?.id_categorie || '', Validators.required],
      id_boutique: [data?.id_boutique || '', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.categorieService.getAll().subscribe((res: any) => {
      this.categories = res.docs || res.data || res;
    });

    this.boutiqueService.getAll().subscribe((res: any) => {
      this.boutiques = res.docs || res.data || res;
    });
  }

  submit() {
    if(this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
