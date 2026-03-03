import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { AppStatTotalByArticleComponent } from 'src/app/components/stat-total-by-article/stat-total-by-article.component';
import { AppTrafficDistributionByArticleComponent } from 'src/app/components/traffic-distribution-by-article/traffic-distribution-by-article.component';
import { AppProductSalesByArticleComponent } from 'src/app/components/stat-total-anne-by-article/product-sales-by-article.component';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-stat-article',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    AppStatTotalByArticleComponent,
    AppTrafficDistributionByArticleComponent,
    AppProductSalesByArticleComponent,
  ],
  templateUrl: './stat-article.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StatArticleComponent implements OnInit {

  articles: any[] = [];
  selectedArticle: any = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    const idBoutique = authData.id_boutique;

    this.articleService.getArticlesByBoutique(idBoutique).subscribe((res: any) => {
      this.articles = Array.isArray(res) ? res : (res.docs || res.data || []);
      if (this.articles.length > 0) {
        this.selectedArticle = this.articles[0];
      }
    });
  }

  onArticleChange(event: any) {
    const id = event.value;
    this.selectedArticle = this.articles.find(a => a._id === id) || null;
  }
}
