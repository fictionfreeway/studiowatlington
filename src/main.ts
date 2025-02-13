// Ensure Zone.js is loaded first
import 'zone.js';

import './styles.css';

// Explicitly include the JIT compiler
import '@angular/compiler';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
