import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { animate, stagger, svg, onScroll } from 'animejs';

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

    animate('#whiteboard-container-desktop', {
      width: ['75vw', '250vw'],
      height: ['75vh', '250vh'],
      left: ['10%', '-30%'],
      top: ['10%', '-30%'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'bottom bottom',
        sync: true,
        debug: true
      })
    })

    animate('#crt-desk', {
      left: ['10%', '20%'],
      bottom: ['-50vh', '-60vh'],
      scale: [1, 0.8],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'bottom bottom',
        sync: true,
      })
    })
    
  }
}
