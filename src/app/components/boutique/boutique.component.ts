import { BoutiqueService } from 'src/app/services/boutique/boutique.service';
import { DynamicFormDialogComponent } from 'src/app/components/dialog/dynamic-form-dialog/dynamic-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  selector: 'app-boutique',
  imports: [CommonModule, MaterialModule],
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
      this.boutiques = res.docs || res;
    });
  }

  openCreateDialog() {
    this.dialog.open(DynamicFormDialogComponent, {
      width: '400px',
      data: {
        title: 'Ajouter Boutique',
        fields: [
          { name: 'nom', label: 'Nom', type: 'text', required: true },
          { name: 'prix_loyer', label: 'Prix Loyer', type: 'number', required: true },
          {
            name: 'validate',
            label: 'Validation',
            type: 'select',
            required: true,
            defaultValue: false,
            options: [
              { value: false, label: 'Ne pas validé' },
              { value: true, label: 'Validé' }
            ]
          }
        ]
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        result.validate = result.validate === true || result.validate === 'true';
        this.boutiqueService.create(result)
          .subscribe(() => this.load());
      }
    });
  }

  openEditDialog(boutique: any) {

    this.dialog.open(DynamicFormDialogComponent, {
      width: '400px',
      data: {
        title: 'Modifier Boutique',
        values: boutique,
        fields: [
          { name: 'nom', label: 'Nom', type: 'text', required: true },
          { name: 'prix_loyer', label: 'Prix Loyer', type: 'number', required: true },
          {
            name: 'validate',
            label: 'Validation',
            type: 'select',
            required: true,
            options: [
              { value: false, label: 'Ne pas validé' },
              { value: true, label: 'Validé' }
            ]
          }
        ]
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        result.validate = result.validate === true || result.validate === 'true';
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
