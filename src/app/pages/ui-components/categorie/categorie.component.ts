import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { CategorieService, Categorie } from 'src/app/services/categorie/categorie.service';
import {
  CategorieDialogComponent
} from "../../../components/dialog/categorie/categorie-dialog/categorie-dialog.component";

@Component({
  selector: 'app-admin-categorie',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'valeur', 'actions'];
  dataSource: Categorie[] = [];

  constructor(
    private categorieService: CategorieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getAll().subscribe({
      next: (res: any) => {
        this.dataSource = res.data || res.docs || res || [];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteCategorie(id: string) {
    if (confirm('Supprimer cette catégorie ?')) {
      this.categorieService.delete(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  openEditDialog(categorie: Categorie) {
    const dialogRef = this.dialog.open(CategorieDialogComponent, {
      width: '400px',
      data: categorie
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categorieService.update(categorie._id!, result)
          .subscribe(() => this.loadCategories());
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CategorieDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categorieService.create(result)
          .subscribe(() => this.loadCategories());
      }
    });
  }
}
