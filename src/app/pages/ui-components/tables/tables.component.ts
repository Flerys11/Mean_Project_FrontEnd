import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ArticleService, Article } from 'src/app/services/article/article.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ArticleDialogComponent} from "../../../components/dialog/article/article-dialog.component";


@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {

  displayedColumns1: string[] = ['nom', 'prix', 'description', 'actions'];
  dataSource1: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (res) => {
        this.dataSource1 = res.data || res.docs || res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  deleteArticle(id: string) {
    if(confirm('Supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  openEditDialog(article: any) {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '400px',
      data: article
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.articleService.updateArticle(article._id, result)
          .subscribe(() => this.loadArticles());
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.articleService.createArticle(result)
          .subscribe(() => this.loadArticles());
      }
    });
  }
}
