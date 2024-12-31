import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TableComponent } from './features/table/table.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: '**', component: DashboardComponent }
];
