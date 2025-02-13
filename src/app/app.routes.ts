import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DesignComponent } from './design.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'design', component: DesignComponent, data: { animation: 'AboutPage' } },
];
