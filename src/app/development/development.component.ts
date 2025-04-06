import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { animate, stagger, svg } from 'animejs';

import template from './development.component.html?raw';
import styles from './development.component.css?inline';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  template: template || '',
  styles: [styles || '']
})
export class DevelopmentComponent implements AfterViewInit {

  // Template references
  @ViewChild('whiteboard') whiteboardRef?: ElementRef;
  @ViewChild('showcaseList') showcaseListRef?: ElementRef;
  @ViewChild('showcaseContent') showcaseContentRef?: ElementRef;
  @ViewChild('showcaseDescription') showcaseDescRef?: ElementRef;
  @ViewChild('crtDesk') crtDeskRef?: ElementRef;
  @ViewChild('whiteboardClose') whiteboardCloseRef?: ElementRef;

  whiteboard?: HTMLElement;
  showcaseList?: HTMLElement;
  showcaseDescription?: HTMLElement;
  crtDesk?: HTMLElement;
  whiteboardClose?: HTMLElement;
  // When a showcase is selected, its object is stored here.
  selectedShowcase: any = {};
  // Flag used to trigger the erase animation (applied via ngClass)
  isErasing: boolean = false;

  // Array of showcase objects to display.
  showcases = [
    {
      title: 'BRRL Events',
      image: 'assets/showcases/brrl-events-showcase.png',
      description: 'A MEAN stack web application created to manage all event hosting, marketing, event fees, and user accounts for Blue Ridge Regional Library, a large public library system covering southwestern Virginia',
      buttonText: 'Visit events.brrl.us',
    },
    {
      title: 'Blue Ridge Regional Library',
      image: 'assets/showcases/brrl-showcase.png',
      description: 'A PHP-based website for the Blue Ridge Regional Library, seamlessly integrated with TLC and Open Library APIs to make discovering books and services easier (and way more fun) for patrons',
      buttonText: 'Visit brrl.lib.va.us'
    }, 
    {
      title: 'Github',
      image: 'assets/showcases/github-showcase.png',
      description: 'The Studio Watlington Github is a diverse showcase of projects—from web dev and game dev to software and beyond—exploring creativity across code and design',
      buttonText: 'Learn More'
    }
  ];

  ngOnInit() {
    this.showcases.forEach(showcase => {
      const img = new Image();
      img.src = showcase.image;
    });
  }

  ngAfterViewInit() {
    this.whiteboard = this.whiteboardRef?.nativeElement;
    this.showcaseList = this.showcaseListRef?.nativeElement;
    this.showcaseDescription = this.showcaseDescRef?.nativeElement;
    this.crtDesk = this.crtDeskRef?.nativeElement;
    this.whiteboardClose = this.whiteboardCloseRef?.nativeElement;
    
    // testing stagger animation through animejs
    animate('.ellipsis-dot', {
      y: [
        { to: '-.25rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800  }
      ],
      delay: stagger(100),
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true
    })

    animate(svg.createDrawable('.whiteboard-path'), {
      draw: ['0 0', '0 1'],
      ease: 'easeIn',
      duration: 100,
      delay: stagger(200),
    });

    animate(svg.createDrawable('.mobile-whiteboard-path'), {
      draw: ['0 0', '0 1'],
      ease: 'easeIn',
      duration: 100,
      delay: stagger(200),
    });
    
  }

  // Called when a project title is clicked from the list.
  titleClicked(showcase: any) {
    this.selectedShowcase = showcase;
  
    if (this.whiteboard) {
      this.whiteboard.classList.toggle('zoomed');
      this.crtDesk?.classList.toggle('zoomed');
      this.whiteboardClose?.classList.toggle('hidden');
      document.body.style.overflow = (document.body.style.overflow === 'hidden') ? 'auto' : 'hidden';
    }

    if (this.showcaseList) {
      this.showcaseList.classList.toggle('not-visible');
    }
  }

  // Close the current showcase.
  closeShowcase() {
    this.selectedShowcase = {};

    if (this.whiteboard) {
      this.whiteboard.classList.toggle('zoomed');
      this.crtDesk?.classList.toggle('zoomed');
      this.whiteboardClose?.classList.toggle('hidden');
      document.body.style.overflow = 'auto';
    }

    if (this.showcaseList) {
      this.showcaseList.classList.toggle('not-visible');
    }
  }
  
  // Go to the next showcase in the array.
  nextShowcase() {
    this.changeShowcase(1);
  }
  
  // Go to the previous showcase in the array.
  prevShowcase() {
    this.changeShowcase(-1);
  }
  
  // Handles the animated change of showcase.
  changeShowcase(direction: number) {
    if (!this.selectedShowcase || !this.selectedShowcase.title) return;
    
    // Trigger the erase animation.
    this.isErasing = true;
    
    // After half the animation duration, update the showcase.
    setTimeout(() => {
      const currentIndex = this.showcases.findIndex(item => item.title === this.selectedShowcase.title);
      const nextIndex = (currentIndex + direction + this.showcases.length) % this.showcases.length;
      this.selectedShowcase = this.showcases[nextIndex];
      setTimeout(() => {
        if (this.showcaseDescRef?.nativeElement) {
          this.showcaseDescRef.nativeElement.scrollTop = 0;
        }
      }, 0);
    }, 500);
    
    // Remove the erasing flag after the full animation.
    setTimeout(() => {
      this.isErasing = false;
    }, 1000);
  }
}
