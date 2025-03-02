import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Import the external template and styles
import template from './design.component.html?raw';
import styles from './design.component.css?inline';

@Component({
  selector: 'app-design',
  standalone: true, // ✅ Required since we're not using an NgModule
  imports: [CommonModule, RouterLink, RouterModule], // Allows *ngIf, *ngFor, etc.
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})
export class DesignComponent implements OnInit {
  templates: { name: string; content: SafeHtml }[] = [];

  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const templatePaths = [
      '/assets/showcases/pes-40.html',
      '/assets/showcases/template2.html',
      '/assets/showcases/template3.html',
    ]; // Manually list HTML files, or generate dynamically if possible

    templatePaths.forEach((path) => {
      fetch(path)
        .then((response) => response.text())
        .then((content) => {
          const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(content); // ✅ Sanitize HTML
          this.templates.push({ name: this.extractFileName(path), content: sanitizedContent });
        })
        .catch((error) => {
          console.error('Error loading template:', path, error);
        });
    });
  }

  extractFileName(path: string): string {
    return path.split('/').pop()?.replace('.html', '') || 'unknown';
  }
}
