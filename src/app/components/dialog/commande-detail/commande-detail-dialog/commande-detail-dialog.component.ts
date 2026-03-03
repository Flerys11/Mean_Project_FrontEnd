import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-commande-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogModule
  ],
  templateUrl: './commande-detail-dialog.component.html',
  styleUrls: ['./commande-detail-dialog.component.scss']
})
export class CommandeDetailDialogComponent {

  displayedColumns: string[] = ['article', 'prix', 'quantite', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public commande: any) {}

  getTotalArticle(article: any): number {
    return article.article.prix * article.quantite;
  }

  getTotalCommande(): number {
    return this.commande.articles.reduce(
      (sum: number, a: any) => sum + (a.article.prix * a.quantite),
      0
    );
  }
}
