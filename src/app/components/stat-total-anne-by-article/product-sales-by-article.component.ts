import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { StatCommandeService } from "../../services/stat/stat.service";
import { DecimalPipe } from "@angular/common";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-sales-by-article',
  standalone: true,
  imports: [CommonModule,MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule, DecimalPipe],
  templateUrl: './product-sales-by-article.component.html',
})
export class AppProductSalesByArticleComponent implements OnInit, OnChanges {

  @Input() idArticle!: string;
  @Input() nomArticle: string = 'Article';

  @ViewChild('chart') chart!: ChartComponent;

  public productsalesChart: any = {};

  annee!: number;
  totalCA = 0;
  totalCommandes = 0;

  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    if (this.idArticle) {
      this.loadStatsAnnee();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idArticle'] && this.idArticle) {
      this.loadStatsAnnee();
    }
  }

  loadStatsAnnee() {
    this.statService.getStatsByArticleAnnee(this.idArticle).subscribe({
      next: (res) => {
        const stat = res.data?.[0];

        if (!stat) return;

        this.annee = stat._id;
        this.totalCA = stat.chiffreAffaire;
        this.totalCommandes = stat.totalCommandes;

        this.initChart(stat.chiffreAffaire);
      },
      error: (err) => console.error(err)
    });
  }

  initChart(chiffreAffaire: number) {
    this.productsalesChart = {
      series: [
        {
          name: 'Chiffre d\'affaires',
          data: [chiffreAffaire],
          color: '#8763da',
        },
      ],
      chart: {
        type: 'area',
        height: 60,
        sparkline: { enabled: true },
        toolbar: { show: false },
      },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: { size: 0 },
      tooltip: { theme: 'dark', x: { show: false } },
    };
  }
}
