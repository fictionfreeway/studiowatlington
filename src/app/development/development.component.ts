import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import template from './development.component.html?raw';
import styles from './development.component.css?inline';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  template: template || '',
  styles: [styles || '']
})


export class DevelopmentComponent {

  // get whiteboard container element from template
  @ViewChild('whiteboard') whiteboardRef?: ElementRef;
  // get showcase list element from template
  @ViewChild('showcaseList') showcaseListRef?: ElementRef;

  whiteboard?: HTMLElement; // holds whiteboard html element assigned in ngOnInit
  showcaseList?: HTMLElement; // holds showcase list html element assigned in ngOnInit
  selectedShowcase: {} = {}; // currently selected showcase object, absence of value used to in *ngIf(s)
  
  // array of showcase objects and content to be displayed in the whiteboard container
  showcases = [
    {
      title: 'BRRL Events',
      image: 'assets/showcases/brrl-events-showcase.png',
      description: 'A MEAN stack web application created to manage all event hosting, marketing, event fees, and user accounts for Blue Ridge Regional Library, a large public library system covering southwestern Virginia',
      buttonText: 'Visit events.brrl.us',
    },
    {
      title: 'Blue Ridge Regional Library',
      image: '',
      description: ''
    }, 
    {
      title: 'Bellevue University',
      image: '',
      description: ''
    }, 
    {
      title: 'Github',
      image: '',
      description: ''
    }
  ];

  ngAfterViewInit() {
    // assign the whiteboardRef to the whiteboard variable
    this.whiteboard = this.whiteboardRef?.nativeElement;
    // assign the showcaseListRef to the showcaseList variable
    this.showcaseList = this.showcaseListRef?.nativeElement;
    console.log(this.whiteboard);
  }

  titleClicked(showcase: {}) {
    this.selectedShowcase = showcase;
  
    if (this.whiteboard) {
      this.whiteboard.classList.toggle('zoomed');
      document.body.style.overflow = (document.body.style.overflow === 'hidden') ? 'auto' : 'hidden';
    }

    if (this.showcaseList) {
      this.showcaseList.classList.toggle('not-visible');
    }
  }

  closeShowcase() {
    this.selectedShowcase = {};

    if (this.whiteboard) {
      this.whiteboard.classList.toggle('zoomed');
      document.body.style.overflow = 'auto';
    }

    if (this.showcaseList) {
      this.showcaseList.classList.toggle('not-visible');
    }
  }
  
 
}
