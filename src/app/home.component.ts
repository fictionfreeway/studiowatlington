import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Required since we're not using an NgModule
  imports: [CommonModule, RouterLink], // Allows *ngIf, *ngFor, etc.
  template: `
    <section class="home">
      <h1>Welcome to Studio Watlington</h1>
      <a routerLink="design">Design</a>
    </section>
  `,
  styles: [`
    .home {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      color: #ff6600;
    }
  `]
})
export class HomeComponent {}
