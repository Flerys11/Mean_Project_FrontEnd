import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  selector: 'app-dynamic-form-dialog',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './dynamic-form-dialog.component.html'
})
export class DynamicFormDialogComponent {

  form: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    const group: any = {};

    data.fields.forEach((field: any) => {

      const defaultValue =
        data.values?.[field.name] ??
        field.defaultValue ??
        (field.type === 'select' ? field.options?.[0]?.value : '');

      group[field.name] = [
        defaultValue,
        field.required ? Validators.required : []
      ];
    });

    this.form = this.fb.group(group);
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  submit() {

    if (this.form.invalid) return;

    if (this.selectedFiles.length > 0) {

      const formData = new FormData();

      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.convertValue(this.form.value[key]));
      });

      this.selectedFiles.forEach(file => {
        formData.append('photos', file);
      });

      this.dialogRef.close(formData);

    } else {

      const cleanData: any = {};

      Object.keys(this.form.value).forEach(key => {
        cleanData[key] = this.convertValue(this.form.value[key]);
      });

      this.dialogRef.close(cleanData);
    }
  }

  private convertValue(value: any) {

    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  }

  close() {
    this.dialogRef.close();
  }
}
