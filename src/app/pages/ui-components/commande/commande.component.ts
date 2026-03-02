import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";

import { CommandeService, Commande } from 'src/app/services/commande/commande.service';
import {
  CommandeDetailDialogComponent
} from "../../../components/dialog/commande-detail/commande-detail-dialog/commande-detail-dialog.component";


@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  displayedColumnsWithActions: string[] = [
    'client',
    'contact',
    'adresse',
    'articles',
    'date',
    'actions'
  ];

  dataSource: Commande[] = [];

  constructor(private commandeService: CommandeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  openDetail(commande: Commande) {
    this.dialog.open(CommandeDetailDialogComponent, {
      width: '700px',
      data: commande
    });
  }

  loadCommandes() {
    this.commandeService.getAll().subscribe({
      next: (res: any) => {
        this.dataSource = res.data || res.docs || res || [];
      },
      error: (err) => {
        console.error('Erreur chargement commandes', err);
      }
    });
  }

  getTotalArticles(commande: Commande): number {
    return commande.articles?.reduce(
      (sum, a) => sum + a.quantite,
      0
    ) || 0;
  }

  valider(commande: Commande) {
    if (!confirm(`Confirmer la validation de la commande de ${commande.nom_client} ?`)) return;
    this.commandeService.validerCommande(commande._id).subscribe({
      next: () => this.loadCommandes(),
      error: (err) => console.error('Erreur validation', err)
    });
  }

  annuler(commande: Commande) {
    if (!confirm(`Confirmer l'annulation de la commande de ${commande.nom_client} ?`)) return;
    this.commandeService.annulerCommande(commande._id).subscribe({
      next: () => this.loadCommandes(),
      error: (err) => console.error('Erreur annulation', err)
    });
  }
}

export class AppCommandesComponent {
}
