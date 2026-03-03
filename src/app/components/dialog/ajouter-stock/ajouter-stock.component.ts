import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-ajouter-stock-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './ajouter-stock.component.html',
})
export class AjouterStockComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AjouterStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      quantite_entree: [0, [Validators.required, Validators.min(1)]]
    });
  }

  save() {
    const result = {
      id_article: this.data._id,
      quantite_entree: this.form.value.quantite_entree
    };

    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }
}
