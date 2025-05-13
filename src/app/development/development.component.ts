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
    // initialize animejs animations, organized into methods for clarity
    this.initIntroAnimations();
    this.initBrrlAnimations();
  }

  //organize animations into methods
  initIntroAnimations() {
    // draw the opening 'projects' header
    animate(svg.createDrawable('.projects-header-path'), {
      draw: ['0 0', '0 1'],
      ease: 'easeIn',
      duration: 100,
      delay: stagger(200)
    });

    // header fades out/scales up while whiteboard expands
    animate('#projects-header', { 
      opacity: [1, 0],
      scale: [1, 1.7],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'top top+=20vh',
        sync: true
      })
    })

    // ellipsis dots bounce animation on #crt-desk
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

    //whiteboard expands to cover the viewport while scrolling down
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
        sync: true
      })
    })

    // crt-desk image moves to the right and scales down while scrolling down (still visible)
    animate('#crt-desk', {
      left: ['10%', '20%'],
      bottom: ['-50vh', '-60vh'],
      scale: [1, 0.8],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'bottom bottom-=50%',
        sync: true,
      })
    })
  }

  initBrrlAnimations() {
    animate(svg.createDrawable('.brrl-header-path'), {
      draw: ['0 0', '0 1'],
      delay: stagger(200),
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top+=80vh',
        leave: 'bottom bottom-=50%',
        sync: true
      })
    })

    //intro animations for brrl website images
    animate('#brrl-website-img', {
      left: ['-95%', '15%'],
      top: ['30rem', '2rem'],
      rotate: ['20deg', '0deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'bottom bottom-=50%',
        sync: true
      })
    })

    animate('#brrl-mobile-img', {
      right: ['-95%', '25%'],
      top: ['50rem', '-15rem'],
      rotate: ['20deg', '-5deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'bottom top',
        leave: 'bottom bottom-=50%',
        sync: true
      })
    })

    // text fades in/slides down while website image moves down
    animate('#brrl-text', {
      opacity: [0, 1],
      translateY: ['-5rem', '0rem'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 50%',
        leave: '100% 100%',
        sync: true
      })
    })

    animate('#brrl-website-img', {
      top: ['2rem', '14rem'],
      rotate: ['0deg', '3deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 50%',
        leave: '100% 100%',
        sync: true
      })
    })

    animate('#brrl-mobile-img', {
      rotate: ['5deg', '-2deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'top bottom-=50%',
        leave: 'bottom bottom',
        sync: true,
        debug: true
      })
    })

    animate('#brrl-menu-img', {
      right: ['-105%', '19%'],
      rotate: ['4deg', '8deg'],
      top: ['-25rem', '-10rem'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: 'top bottom-=50%',
        leave: 'bottom bottom',
        sync: true
      })
    })
  }
}
