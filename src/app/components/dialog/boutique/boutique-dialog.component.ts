import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-boutique-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './boutique-dialog.component.html',
  styleUrls: ['./boutique-dialog.component.scss']
})
export class BoutiqueDialogComponent implements OnInit {
  boutiqueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BoutiqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.boutiqueForm = this.fb.group({
      nom: ['', Validators.required],
      prix_loyer: ['', [Validators.required, Validators.min(1)]],
      validate: [false, Validators.required]
    });
  }

  ngOnInit() {
    if (this.data.values) {
      this.boutiqueForm.patchValue({
        nom: this.data.values.nom,
        prix_loyer: this.data.values.prix_loyer,
        validate: this.data.values.validate === true
      });
    }
  }

  getStatusLabel(value: boolean | null): string {
    if (value === true) return 'Validé';
    if (value === false) return 'Non validé';
    return 'Sélectionner un statut';
  }

  onSubmit() {
    if (this.boutiqueForm.valid) {
      const formValue = this.boutiqueForm.value;
      // Conversion explicite du statut de validation
      formValue.validate = formValue.validate === true;
      this.dialogRef.close(formValue);
    }
  }
}
