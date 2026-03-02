import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ArticleService } from 'src/app/services/article/article.service';
import { BoutiqueService } from 'src/app/services/boutique/boutique.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { DynamicFormDialogComponent } from 'src/app/components/dialog/dynamic-form-dialog/dynamic-form-dialog.component';
@Component({
  standalone: true,
  selector: 'app-article',
  imports: [CommonModule, MaterialModule],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];
  boutiques: any[] = [];
  categories: any[] = [];

  displayedColumns = ['nom', 'prix', 'description', 'actions'];

  constructor(
    private articleService: ArticleService,
    private boutiqueService: BoutiqueService,
    private categorieService: CategorieService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.articleService.getAllArticles().subscribe((res: any) => {
      this.articles = res.docs || res;
    });

    this.boutiqueService.getAll().subscribe((res: any) => {
      this.boutiques = res.docs || res;
    });

    this.categorieService.getAll().subscribe((res: any) => {
      this.categories = res.docs || res;
    });
  }

  openCreateDialog() {
    this.dialog.open(DynamicFormDialogComponent, {
      width: '500px',
      data: {
        title: 'Ajouter Article',
        fields: [
          { name: 'nom_article', label: 'Nom', type: 'text', required: true },
          { name: 'prix', label: 'Prix', type: 'number', required: true },
          { name: 'description', label: 'Description', type: 'text', required: true },
          { name: 'id_categorie', label: 'Catégorie', type: 'select', options: this.categories, required: true },
          { name: 'id_boutique', label: 'Boutique', type: 'select', options: this.boutiques, required: true },
          { name: 'photo', label: 'Photos', type: 'file' }
        ]
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.articleService.createArticle(result).subscribe(() => this.loadAll());
      }
    });
  }

  openEditDialog(article: any) {

    this.dialog.open(DynamicFormDialogComponent, {
      width: '500px',
      data: {
        title: 'Modifier Article',
        values: article,
        fields: [
          { name: 'nom_article', label: 'Nom', type: 'text', required: true },
          { name: 'prix', label: 'Prix', type: 'number', required: true },
          { name: 'description', label: 'Description', type: 'text', required: true },
          { name: 'id_categorie', label: 'Catégorie', type: 'select', options: this.categories, required: true },
          { name: 'id_boutique', label: 'Boutique', type: 'select', options: this.boutiques, required: true },
          { name: 'photo', label: 'Photos', type: 'file' }
        ]
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.articleService.updateArticle(article._id, result)
          .subscribe(() => this.loadAll());
      }
    });
  }

  deleteArticle(id: string) {
    if (confirm('Supprimer cet article ?')) {
      this.articleService.deleteArticle(id)
        .subscribe(() => this.loadAll());
    }
  }
}
