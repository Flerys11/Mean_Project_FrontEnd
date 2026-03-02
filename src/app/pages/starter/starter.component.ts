import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppProfitExpensesComponent } from 'src/app/components/stat-total/stat-total.component';
import { AppTrafficDistributionComponent } from 'src/app/components/traffic-distribution/traffic-distribution.component';
import { AppProductSalesComponent } from 'src/app/components/stat-total-annee/product-sales.component';
import { AppUpcomingSchedulesComponent } from 'src/app/components/upcoming-schedules/upcoming-schedules.component';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';
import { AppBlogComponent } from 'src/app/components/apps-blog/apps-blog.component';



@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppProfitExpensesComponent,
    AppTrafficDistributionComponent,
    AppProductSalesComponent,
    AppUpcomingSchedulesComponent,
    AppTopEmployeesComponent,
    AppBlogComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }
