import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import template from './design.component.html?raw';
import styles from './design.component.css?inline';

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  encapsulation: ViewEncapsulation.None,
  template: template || '',
  styles: [styles || '']
})
export class DesignComponent implements OnInit {
  templates: { content: SafeHtml }[] = [];
  currentTemplateIndex = 0;
  transitionClass = '';

  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const templatePaths = [
      '/assets/showcases/Design.html',
      /* '/assets/showcases/PES_40th_Anniversary_Campaign.html', */
      '/assets/showcases/BRRL_Design.html',
      '/assets/showcases/social_design.html'
    ];
  
    // Fetch templates in order
    Promise.all(
      templatePaths.map(path =>
        fetch(path)
          .then(response => response.text())
          .then(content => this.sanitizer.bypassSecurityTrustHtml(content))
          .catch(error => {
            console.error('Error loading template:', path, error);
            return ''; // Return empty content on error to avoid breaking array order
          })
      )
    ).then(contents => {
      this.templates = contents.map(content => ({ content })); // Assign in order
    });
  
    // Attach idle bounce class on init
    const rightArrow = document.getElementById('right-arrow');
    if (rightArrow) {
      rightArrow.classList.add('arrow-idle-bounce');
    }
  }
  

  showNextTemplate(): void {
    this.transitionClass = 'slide-out-left';
    setTimeout(() => {
      this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.templates.length;
      this.transitionClass = 'slide-in-right';
    }, 400);
  }

  showPreviousTemplate(): void {
    this.transitionClass = 'slide-out-right';
    setTimeout(() => {
      this.currentTemplateIndex =
        (this.currentTemplateIndex - 1 + this.templates.length) % this.templates.length;
      this.transitionClass = 'slide-in-left';
    }, 400);
  }


  // ─────────────────────────────────────────────────────────────────
  //  BOUNCE ARROW METHODS (imperative approach)
  // ─────────────────────────────────────────────────────────────────

  bounceLeftArrow(): void {
    const leftArrow = document.getElementById('left-arrow');
    if (!leftArrow) return;

    // Remove the class if it’s still lingering
    leftArrow.classList.remove('left-arrow-clicked');

    // Force a reflow, so we can re-trigger the animation
    void leftArrow.offsetWidth;

    // Add the class to start the animation
    leftArrow.classList.add('left-arrow-clicked');

    // Remove class after animation completes (300ms)
    setTimeout(() => {
      leftArrow.classList.remove('left-arrow-clicked');
    }, 300);
  }

  // 2) On click, permanently remove idle bounce, run click bounce once.
  bounceRightArrow(): void {
    const rightArrow = document.getElementById('right-arrow');
    if (!rightArrow) return;

    // Remove idle bounce class
    rightArrow.classList.remove('arrow-idle-bounce');
    // Force reflow so new animation can start fresh
    void rightArrow.offsetWidth;

    // Add click bounce class
    rightArrow.classList.add('right-arrow-clicked');

    // (Optional) remove click bounce class after 300ms
    setTimeout(() => {
      rightArrow.classList.remove('right-arrow-clicked');
    }, 300);
  }
}
