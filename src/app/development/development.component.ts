import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { animate, stagger, svg, onScroll, createTimeline } from 'animejs';

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
    const tl = createTimeline({
      defaults: {}
    })
    // 'projects' header starting position
    .add('#projects-header', {
      opacity: 0,
      scale: 1
    }, 0)
    // 'projects' header scales up/fades out with whiteboard expansion
    .add('#projects-header', {
      opacity: 0,
      scale: 2.2,
      duration: 150
    }, 1)
    // whiteboard starting position
    .add('#whiteboard-container-desktop', {
      width: '75vw',
      height: '75vh',
      left: '10%',
      top: '10%',
      duration: 0
    }, 0)
    // whiteboard expands to cover the viewport
    .add('#whiteboard-container-desktop', { 
      width: '250vw',
      height: '250vh',
      left: '-30%',
      top: '-30%',
      duration: 250
    }, 1)
    // crt-desk starting position
    .add('#crt-desk', {
      left: '10%',
      bottom: '-50vh',
      scale: 1,
      duration: 0
    }, 0)
    // crt-desk image moves to the right and scales down
    .add('#crt-desk', {
      left: '20%',
      bottom: '-60vh',
      scale: 0.8,
      duration: 750
    }, 250)

    // draw the opening 'projects' header
    animate(svg.createDrawable('.projects-header-path'), {
      draw: ['0 0', '0 1'],
      ease: 'easeIn',
      duration: 100,
      delay: stagger(200)
    });

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

    // connect timeline to scroll event
    onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 0%',
        leave: '100% 50%',
        sync: true
    }).link(tl);
  }

  initBrrlAnimations() {
    /* Intro animations */

    // add float animation to the images
    this.addFloatAnimationToElement('#brrl-menu-img');
    this.addFloatAnimationToElement('#brrl-mobile-img');
    this.addFloatAnimationToElement('#brrl-website-img');

    animate(svg.createDrawable('.brrl-header-path'), {
      draw: ['0 0', '0 1'],
      delay: stagger(200),
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 55%',
        sync: true
      })
    })

    const tl = createTimeline({
      defaults: {},
    })
    // menu img starting position
    .add('#brrl-menu-img', {
      right: [
        {to: '-25%'}
      ],
      rotate: [
        {to: '-40deg'}
      ],
      top: [
        {to: '-25rem'}
      ],
      duration: 0
    }, 0)
    // menu img slides in from right
    .add('#brrl-menu-img', {
      right: [
        {to: '19%' }
      ],
      rotate: [
        {to:'8deg'}
      ],
      top: [
        {to: '-10rem'}
      ],
      duration: 500
    }, 250)
    // menu img flies away to the right
    .add('#brrl-menu-img', {
      right: [
        {to: '-25%'}
      ],
      rotate: [
        {to: '-40deg'}
      ],
      top: [
        {to: '-25rem'}
      ],
      duration: 150,
      ease: 'inBack'
    }, 750)
    // text fades in
    .add('#brrl-text', {
      opacity: [0, 1],
      translateY: ['-5rem', '0rem'],
      duration: 250
    }, 250)
    // mobile img initial position
    .add('#brrl-mobile-img', {
      right: '-95%',
      top: '50rem',
      rotate: '20deg',
      duration: 0
    }, 0)
    // mobile img flies in from the right
    .add('#brrl-mobile-img', {
      right: '25%',
      top: '-15rem',
      rotate: '-5deg',
      duration: 500,
      ease: 'outBack'
    }, 50)
    // mobile image moves down and rotates slightly to accompany menu-img
    .add('#brrl-mobile-img', {
      right: '22%',
      rotate: '-2deg',
      top: '-12rem',
      duration: 250,
      ease: 'outBack'
    }, 250)
    // mobile img flies away to the right
    .add('#brrl-mobile-img', {
      right: '55%',
      top: '-125rem',
      rotate: '20deg',
      duration: 250,
      ease: 'inBack'
    }, 750)
    // website img starting position
    .add('#brrl-website-img', {
      left: '-95%',
      top: '30rem',
      rotate: '20deg',
      duration: 0
    }, 0)
    // website img slides in from the left
    .add('#brrl-website-img', {
      left: '15%',
      top: '2rem',
      rotate: '0deg',
      duration: 250,
      ease: 'inOutBack'
    }, 1)
    // website img move down and rotate slightly to accompany the text
    .add ('#brrl-website-img', {
      top: '14rem',
      rotate: '5deg',
      duration: 250,
      ease: 'outBack'
    }, 250)
    // website img flies away
    .add('#brrl-website-img', {
      left: '180%',
      top: '30rem',
      rotate: '20deg',
      duration: 100,
      ease: 'inBack'
    }, 900)

    onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 0%',
        leave: '100% 100%',
        sync: true
    }).link(tl);

    
  }

  // takes html identifier of element and adds looping 'floaty' animation
  addFloatAnimationToElement(element: string) {
    animate(element, {
      translateY: [
      { to: `${(Math.random() * 4 - 2).toFixed(2)}rem` },
      { to: `${(Math.random() * 4 - 2).toFixed(2)}rem` }
      ],
      translateX: [
      { to: `${(Math.random() * 4 - 2).toFixed(2)}rem` },
      { to: `${(Math.random() * 4 - 2).toFixed(2)}rem` }
      ],
      duration: Math.floor(Math.random() * (7000 - 4000 + 1)) + 4000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      composition: 'blend'
    });
  }
}
