import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None, // ✅ Disable encapsulation
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})
export class DesignComponent implements OnInit {
  templates: { content: SafeHtml }[] = [];
  currentTemplateIndex: number = 0;
  transitionClass: string = '';

  private sanitizer = inject(DomSanitizer);

  // file names are used as titles in template with all "_" replaced with " "
  ngOnInit(): void {
    const templatePaths = [
      '/assets/showcases/Design.html',
      '/assets/showcases/PES_40th_Anniversary_Campaign.html',
      '/assets/showcases/template3.html',
    ]; // Manually list HTML files, or generate dynamically if possible

    templatePaths.forEach((path) => {
      fetch(path)
        .then((response) => response.text())
        .then((content) => {
          const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(content); // ✅ Sanitize HTML
          this.templates.push({ content: sanitizedContent });
        })
        .catch((error) => {
          console.error('Error loading template:', path, error);
        });
    });
  }

  showNextTemplate(): void {
    this.transitionClass = 'slide-out-left';
    setTimeout(() => {
      this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.templates.length;
      this.transitionClass = 'slide-in-right';
    }, 500);
  }

  showPreviousTemplate(): void {
    this.transitionClass = 'slide-out-right';
    setTimeout(() => {
      this.currentTemplateIndex = (this.currentTemplateIndex - 1 + this.templates.length) % this.templates.length;
      this.transitionClass = 'slide-in-left';
    }, 500);
  }
}
