import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-design',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page">
      <h1>Design Page</h1>
      <a routerLink="">Home</a>
    </section>
  `,
  styles: [`
    .page {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
  `]
})
export class DesignComponent {}
