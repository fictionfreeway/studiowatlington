import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

// Import the external template and styles
import template from './design.component.html?raw';
import styles from './design.component.css?inline';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Required since we're not using an NgModule
  imports: [CommonModule, RouterLink, RouterModule], // Allows *ngIf, *ngFor, etc.
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})


export class DesignComponent {}
