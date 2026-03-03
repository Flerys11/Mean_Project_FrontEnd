import { BoutiqueService } from 'src/app/services/boutique/boutique.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BoutiqueDialogComponent } from 'src/app/components/dialog/boutique/boutique-dialog.component';

@Component({
  standalone: true,
  selector: 'app-boutique',
  imports: [CommonModule, MaterialModule, BoutiqueDialogComponent],
  templateUrl: './boutique.component.html'
})
export class BoutiqueComponent implements OnInit {

  boutiques: any[] = [];
  displayedColumns = ['nom', 'prix_loyer', 'validate', 'actions'];

  constructor(
    private boutiqueService: BoutiqueService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.boutiqueService.getAll().subscribe((res: any) => {
      this.boutiques = Array.isArray(res) ? res : (res.docs || res.data || []);
    });
  }

  openCreateDialog() {
    this.dialog.open(BoutiqueDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Ajouter Boutique',
        values: null
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.boutiqueService.create(result)
          .subscribe(() => this.load());
      }
    });
  }

  openEditDialog(boutique: any) {
    this.dialog.open(BoutiqueDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Modifier Boutique',
        values: boutique
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.boutiqueService.update(boutique._id, result)
          .subscribe(() => this.load());
      }
    });
  }

  deleteBoutique(id: string) {
    if (confirm('Supprimer cette boutique ?')) {
      this.boutiqueService.delete(id)
        .subscribe(() => this.load());
    }
  }

}
