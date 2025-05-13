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
        enter: '100% top',
        leave: '0% top+=20vh',
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
        enter: '100% 0%',
        leave: '100% 25%',
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
        enter: '100% 0%',
        leave: '100% 50%',
        sync: true,
      })
    })
  }

  initBrrlAnimations() {
    /* Intro animations */

    animate(svg.createDrawable('.brrl-header-path'), {
      draw: ['0 0', '0 1'],
      delay: stagger(200),
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 20%',
        leave: '100% 25%',
        sync: true
      })
    })

    //intro animations for brrl website images
    animate('#brrl-website-img', {
      left: ['-95%', '15%'],
      top: ['30rem', '2rem'],
      rotate: ['20deg', '0deg'],
      ease: 'inOutBack',
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 25%',
        sync: true
      })
    })

    animate('#brrl-mobile-img', {
      right: ['-95%', '25%'],
      top: ['50rem', '-15rem'],
      rotate: ['20deg', '-5deg'],
      ease: 'inOutBack',
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 25%',
        sync: true
      })
    })

    // text fades in/slides down while website image moves down
    /* animate('#brrl-text', {
      opacity: [0, 1],
      translateY: ['-5rem', '0rem'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 25%',
        leave: '100% 50%',
        sync: true
      })
    }) */

    // website image moves down and rotates slightly to accompany the text
    /* animate('#brrl-website-img', {
      top: ['2rem', '11rem'],
      rotate: ['0deg', '3deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 25%',
        leave: '100% 50%',
        sync: true
      }),
      ease: 'outBack'
    }) */

    // mobile image moves down and rotates slightly to accompany menu-img
    animate('#brrl-mobile-img', {
      rotate: ['5deg', '-2deg'],
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 25%',
        leave: '100% 50%',
        sync: true
      })
    })

    // mobile menu image slides in from right while rotating, landing on top of #brrl-mobile-img
    /* animate('#brrl-menu-img', {
      right: [
        {to: '-50%', duration: '25%'},
        {to: '19%'}
      ],
      rotate: ['-40deg', '8deg'],
      top: ['-25rem', '-10rem'],
      ease: 'outCirc',
      autoplay: onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 100%',
        sync: true,
        debug: true
      })
    }) */

    const tl = createTimeline({
      defaults: {
        
      },
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
      duration: 250
    }, 750)
    // website img move down and rotate slightly to accompany the text
    .add ('#brrl-website-img', {
      top: ['2rem', '11rem'],
      rotate: ['0deg', '3deg'],
      ease: 'outBack',
      duration: 250
    }, 250)
    // text fades in
    .add('#brrl-text', {
      opacity: [0, 1],
      translateY: ['-5rem', '0rem'],
      duration: 250
    }, 250)


    onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 0%',
        leave: '100% 100%',
        sync: true,
        debug: true
    }).link(tl);
  }
}
