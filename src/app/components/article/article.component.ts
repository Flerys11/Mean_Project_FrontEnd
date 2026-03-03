import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ArticleService } from 'src/app/services/article/article.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ArticleDialogComponent } from 'src/app/components/dialog/article/article-dialog.component';

@Component({
  standalone: true,
  selector: 'app-article',
  imports: [CommonModule, MaterialModule, ArticleDialogComponent],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];
  boutiques: any[] = [];
  categories: any[] = [];

  displayedColumns = ['nom', 'prix', 'description', 'actions'];

  constructor(
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    const idBoutique = authData.id_boutique;

    this.articleService.getArticlesByBoutique(idBoutique).subscribe((res: any) => {
      this.articles = Array.isArray(res) ? res : (res.docs || res.data || []);
    });


    this.categorieService.getAll().subscribe((res: any) => {
      this.categories = Array.isArray(res) ? res : (res.docs || res.data || []);
    });
  }

  openCreateDialog() {
    this.dialog.open(ArticleDialogComponent, {
      width: '550px',
      disableClose: true,
      data: {
        title: 'Ajouter Article',
        categories: this.categories,
        values: null
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.articleService.createArticle(result).subscribe({
          next: () => {
            this.loadAll();
          },
          error: (err) => {
            console.error('Erreur lors de la création:', err);
          }
        });
      }
    });
  }

  openEditDialog(article: any) {
    this.dialog.open(ArticleDialogComponent, {
      width: '550px',
      disableClose: true,
      data: {
        title: 'Modifier Article',
        categories: this.categories,
        values: article
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.articleService.updateArticle(article._id, result).subscribe({
          next: () => {
            this.loadAll();
          },
          error: (err) => {
            console.error('Erreur lors de la modification:', err);
          }
        });
      }
    });
  }

  deleteArticle(id: string) {
    if (confirm('Supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe({
        next: () => this.loadAll(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
