import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { animate } from 'animejs';

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

  private sanitizer = inject(DomSanitizer);

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

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    animate('#design-cassette-container', {
      x: [
        { to: '40vw', duration: 1000, ease: 'outExpo' },
        { to:  '0vw', duration: 2000, ease: 'outElastic' }
      ],
      opacity: 1
    });

    animate('#ui-cloud', {
      x: [
        { to: '-40vw', duration: 1000, ease: 'outExpo' },
        { to:  '0vw', duration: 2000, ease: 'outElastic' }
      ],
      opacity: 1
    });
    
    animate('#ui-cloud', {
      y: ['0vh', '-2vh'],
      duration: 2000,
      ease: 'inOutSine',
      loop: true,
      alternate: true
    }); 

    animate('#right-arrow', {
      rotate: [
        { to: -15, duration: 0 },
        { to: 0, duration: 300, delay: 3000, ease: 'inSine' },
        { to:  -15, duration: 1000, ease: 'outBounce'}
      ],
      loop: true,
      loopDelay: 3000
    })
  }
  
  showNextTemplate(): void {
    animate('#showcase-content', {
      x: [
        { to: '120%', duration: 400},
        { to: '-120%', duration: 0 },
        { to: '0%', duration: 400, delay: 150 }
      ],
      ease: 'inOutBack'
    })
    setTimeout(() => {
      this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.templates.length;
    }, 400);
  }

  showPreviousTemplate(): void {
    animate('#showcase-content', {
      x: [
        { to: "-120%", duration: 400 },
        { to: "120%", duration: 0 },
        { to: "0%", duration: 400, delay: 50 },
      ],
      ease: 'inOutBack'
    })
    setTimeout(() => {
      this.currentTemplateIndex =
        (this.currentTemplateIndex - 1 + this.templates.length) % this.templates.length;
    }, 400);
  }

  bounceRightArrow(): void {
    animate('#right-arrow', {
      rotate: [
        { to: -15, duration: 0 },
        { to: 0, duration: 100, ease: 'outCirc' },
        { to:  -15, duration: 400, ease: 'outBounce'}
      ],
    })
  }

  bounceLeftArrow(): void {
    animate('#left-arrow', {
      rotate: [
        { to: -10, duration: 0 },
        { to: 0, duration: 300, ease: 'outBouce' },
        { to:  -10, duration: 700, ease: 'outBounce'}
      ],
    })
  }
}
