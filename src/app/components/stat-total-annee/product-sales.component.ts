import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import {StatCommandeService} from "../../services/stat/stat.service";
import {CommonModule, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-stat-total-annee',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule, DecimalPipe, CommonModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent implements OnInit {

  @ViewChild('chart') chart!: ChartComponent;

  public productsalesChart: any;

  annee!: number;
  totalCA = 0;
  totalCommandes = 0;


  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    this.loadStatsAnnee();
  }

  loadStatsAnnee() {

    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    const idBoutique = authData.id_boutique;

    this.statService.getStatsAnnee(idBoutique).subscribe({
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
          name: 'Chiffre d’affaires',
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
