import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Import the external template and styles
import template from './home.component.html?raw';
import styles from './home.component.css?inline';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Required since we're not using an NgModule
  imports: [CommonModule, RouterLink], // Allows *ngIf, *ngFor, etc.
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})
export class HomeComponent {
  ngAfterViewInit() {
    this.loadSVG();
  }

  async loadSVG() {
    try {
      const response = await fetch('/assets/svg/cityscape.svg');
      const svgText = await response.text();
      document.getElementById('cityscape-container')!.innerHTML = svgText;

      // After inserting, start animating windows
      this.animateWindows();
    } catch (error) {
      console.error('Failed to load SVG:', error);
    }
  }

  animateWindows() {
    const windows = document.querySelectorAll('.window');

    setInterval(() => {
      windows.forEach(window => {
        if (Math.random() > 0.996) { // 20% chance to toggle each cycle
          window.setAttribute('fill', window.getAttribute('fill') === 'black' ? '#fccf03' : 'black');
        }
      });
    },400); // Change every second
  }
}
