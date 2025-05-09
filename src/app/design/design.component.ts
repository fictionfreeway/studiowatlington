import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { animate } from 'animejs';

import template from './design.component.html?raw';
import styles from './design.component.css?inline';

import { DarkModeButtonComponent } from '../dark-mode-button/dark-mode-button.component';

/**
 * Component responsible for displaying the design portfolio.
 * It fetches and renders HTML templates for different design showcases,
 * handles navigation between these showcases, and manages theme changes.
 */
@Component({
  selector: 'app-design',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, DarkModeButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: template || '',
  styles: [styles || '']
})
export class DesignComponent implements OnInit {
  /**
   * An array of objects, where each object contains the sanitized HTML content
   * for a design showcase template.
   */
  templates: { content: SafeHtml }[] = [];
  /**
   * The index of the currently displayed template in the `templates` array.
   */
  currentTemplateIndex = 0;

  private sanitizer = inject(DomSanitizer);

  /**
   * Initializes the component by fetching the design showcase templates.
   */
  ngOnInit(): void {
    const templatePaths = [
      '/assets/showcases/Design.html',
      /* '/assets/showcases/PES_40th_Anniversary_Campaign.html', */
      '/assets/showcases/brrl_design.html',
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
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized
   * the component's view. Initializes animations for various elements.
   */
  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  /**
   * Initializes animations for UI elements like the design cassette and UI cloud,
   * and the navigation arrows.
   */
  private initializeAnimations() {
    // Animates the design cassette container
    animate('#design-cassette-container', {
      x: [
        { to: '40vw', duration: 1000, ease: 'outExpo' },
        { to:  '0vw', duration: 2000, ease: 'outElastic' }
      ],
      opacity: 1
    });

    // Animates the UI cloud element
    animate('#ui-cloud', {
      x: [
        { to: '-40vw', duration: 1000, ease: 'outExpo' },
        { to:  '0vw', duration: 2000, ease: 'outElastic' }
      ],
      opacity: 1
    });
    
    // Animates the UI cloud with a vertical bobbing motion
    animate('#ui-cloud', {
      y: ['0vh', '-2vh'],
      duration: 2000,
      ease: 'inOutSine',
      loop: true,
      alternate: true
    }); 

    // Animates the right navigation arrow with a subtle rotation effect
    animate('#right-arrow', {
      rotate: [
        { to: -15, duration: 0 },
        { to: -5, duration: 200, delay: 3000, ease: 'inSine' },
        { to:  -9, duration: 100, ease: 'outBounce'},
        { to: -5, duration: 200, ease: 'inSine' },
        { to: -15, duration: 500, ease: 'outBounce'}
      ],
      loop: true,
      loopDelay: 2000
    })
  }
  
  /**
   * Displays the next design showcase template in the `templates` array.
   * Animates the transition between templates.
   */
  showNextTemplate(): void {
    // Animates the showcase content sliding out to the left and the new one sliding in
    animate('#showcase-content', {
      x: [
        { to: '-120%', duration: 400},
        { to: '120%', duration: 0 },
        { to: '0%', duration: 400, delay: 150 }
      ],
      ease: 'inOutBack'
    })
    setTimeout(() => {
      this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.templates.length;
    }, 400);
  }

  /**
   * Displays the previous design showcase template in the `templates` array.
   * Animates the transition between templates.
   */
  showPreviousTemplate(): void {
    // Animates the showcase content sliding out to the right and the new one sliding in
    animate('#showcase-content', {
      x: [
        { to: "120%", duration: 400 },
        { to: "-120%", duration: 0 },
        { to: "0%", duration: 400, delay: 50 },
      ],
      ease: 'inOutBack'
    })
    setTimeout(() => {
      this.currentTemplateIndex =
        (this.currentTemplateIndex - 1 + this.templates.length) % this.templates.length;
    }, 400);
  }

  /**
   * Triggers a bounce animation on the right navigation arrow when clicked.
   */
  bounceRightArrow(): void {
    animate('#right-arrow', {
      rotate: [
        { to: -15, duration: 0 },
        { to: 0, duration: 100, ease: 'outCirc' },
        { to:  -15, duration: 400, ease: 'outBounce'}
      ],
    })
  }

  /**
   * Triggers a bounce animation on the left navigation arrow when clicked.
   */
  bounceLeftArrow(): void {
    animate('#left-arrow', {
      rotate: [
        { to: -10, duration: 0 },
        { to: 0, duration: 100, ease: 'outCirc' },
        { to:  -10, duration: 400, ease: 'outBounce'}
      ],
    })
  }

  /**
   * Sets the theme (light or dark) for the design component.
   * @param requestedTheme The theme to apply ('light' or 'dark').
   */
  setTheme(requestedTheme: string): void {
    console.log('Requested theme:', requestedTheme);
    let designComponent = document.querySelector('#design-container');
    if (designComponent) {
      designComponent.classList.remove('light', 'dark');
      designComponent.classList.add(requestedTheme);
    } else {
      console.error('Design component not found');
    }
  }
}
