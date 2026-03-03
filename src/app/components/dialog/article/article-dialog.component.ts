import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article-dialog',
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
    MatCardModule,
    MatTabsModule
  ],
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  articleForm: FormGroup;
  categories: any[] = [];
  photos: string[] = [];
  existingPhotos: string[] = [];
  photosToDelete: string[] = [];
  selectedPhotoIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private articleService: ArticleService
  ) {
    this.categories = data.categories || [];

    this.articleForm = this.fb.group({
      nom_article: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      id_categorie: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data.values) {
      this.articleForm.patchValue({
        nom_article: this.data.values.nom_article,
        prix: this.data.values.prix,
        description: this.data.values.description,
        id_categorie: this.data.values.id_categorie?._id || this.data.values.id_categorie,
      });

      if (this.data.values.photo && this.data.values.photo.length > 0) {
        this.existingPhotos = [...this.data.values.photo];
        this.photos = [...this.data.values.photo];
      }
    }
  }

  compressImage(base64String: string, maxWidth: number = 800, maxHeight: number = 800, quality: number = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }

  async onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      try {
        const base64Photos = await this.articleService.filesToBase64(files);

        const compressedPhotos = await Promise.all(
          base64Photos.map(photo => this.compressImage(photo, 800, 800, 0.7))
        );

        this.photos = [...this.photos, ...compressedPhotos];
      } catch (error) {
        console.error('Erreur lors de la compression des images:', error);
      }

      this.fileInput.nativeElement.value = '';
    }
  }

  removePhoto(index: number) {
    const removedPhoto = this.photos[index];

    if (this.existingPhotos.includes(removedPhoto)) {
      this.photosToDelete.push(removedPhoto);
    }

    this.photos.splice(index, 1);

    if (this.selectedPhotoIndex >= this.photos.length) {
      this.selectedPhotoIndex = Math.max(0, this.photos.length - 1);
    }
  }

  selectPhoto(index: number) {
    this.selectedPhotoIndex = index;
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

      formValue.photo = this.photos.filter(photo =>
        photo && photo.length > 0 && photo.startsWith('data:image')
      );

      const authData = JSON.parse(localStorage.getItem('authData') || '{}');
      const id_boutique = authData.id_boutique;

      const articleData = {
        ...formValue,
        id_boutique: id_boutique,
      };
      this.dialogRef.close(articleData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  getPhotoUrl(photo: string): string {
    if (photo.startsWith('data:image')) {
      return photo;
    }
    return photo;
  }

  isNewPhoto(photo: string): boolean {
    return !this.existingPhotos.includes(photo);
  }
}
