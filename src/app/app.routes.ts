import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesignComponent } from './design/design.component';
import { DevelopmentComponent } from './development/development.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'design', component: DesignComponent, data: { animation: 'AboutPage' } },
  { path: 'development', component: DevelopmentComponent, data: { animation: 'ContactPage' } }
];
