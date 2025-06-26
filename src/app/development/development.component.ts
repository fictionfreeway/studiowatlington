import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { animate, stagger, svg, onScroll, createTimeline, JSAnimation } from 'animejs';

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
    this.initBrrlEventsAnimations();
    this.initLastAnimations();
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
      left: '40%',
      duration: 150
    }, 1)
    // whiteboard starting position
    .add('#whiteboard-container-desktop', {
      width: '60vw',
      height: '75vh',
      left: '5%',
      top: '15%',
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
    // computer-desk starting position
    .add('#computer-desk', {
      left: '10%',
      bottom: '-50vh',
      scale: 1,
      duration: 0
    }, 0)
    // computer-desk image moves to the right and scales down
    .add('#computer-desk', {
      left: '20%',
      bottom: '-60vh',
      scale: 0.8,
      duration: 750
    }, 1)
    // window starting position
    .add('#background-window', {
      right: 0,
      top: 0,
      width: '35vw'
    }, 0)
    // window scales up and moves to the right to match the whiteboard
    .add('#background-window', {
      right: '-250%',
      scale: 4,
      duration: 250,
    }, 1)

    // draw the opening 'projects' header
    animate(svg.createDrawable('.projects-header-path'), {
      draw: ['0 0', '0 1'],
      ease: 'easeIn',
      duration: 100,
      delay: stagger(200)
    });

    // ellipsis dots bounce animation on #computer-desk
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
        enter: '100% 0%',
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
        leave: '100% 35%',
        sync: true
      })
    })
    
    // animation dependent on screen orientation (set on init)
    if(window.matchMedia('(orientation: landscape)').matches) {
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
    } else {
      const tl = createTimeline({
        defaults: {},
      })
      // mobile img starting position
      .add('#brrl-mobile-img', {
        left: '-35%',
        duration: 0
      }, 0)
      // mobile img flies in from the left
      .add('#brrl-mobile-img', {
        left: '10%',
        top: '3rem',
        duration: 500,
        ease: 'outBack'
      }, 1)
      // mobile img slides to left to accomodate text
      .add('#brrl-mobile-img', {
        left: '-33%',
        duration: 200
      }, 500)
      // mobile img flies away to the left
      .add('#brrl-mobile-img', {
        left: '135%',
        top: '-20rem',
        duration: 200,
        ease: 'inBack'
      }, 700)
      // menu img initial position
      .add('#brrl-menu-img', {
        right: '-35%',
        duration: 0
      }, 0)
      // menu img flies in from the right
      .add('#brrl-menu-img', {
        right: '10%',
        top: '3rem',
        duration: 500,
        ease: 'outBack' 
      }, 1)
      // menu img slides to the right to accomodate text
      .add ('#brrl-menu-img', {
        right: '-29%',
        duration: 200
      }, 500)
      // menu img flies away to the left
      .add('#brrl-menu-img', {
        right: '135%',
        top: '20rem',
        duration: 200,
        ease: 'inBack'
      }, 750)
      // website img starting position
      .add('#brrl-website-img', {
        left: '-35%',
        duration: 0
      }, 0)
      // website img slides in from the left
      .add('#brrl-website-img', {
        left: '0%',
        top: '23rem',
        duration: 500,
        ease: 'outBack'
      }, 1)
      // website img floats around for a bit/moves down
      .add('#brrl-website-img', {
        left: '2%',
        top: '16rem',
        duration: 250,
        ease: 'inOutBack'
      }, 500)
      // website img flies away to the bottom right
      .add('#brrl-website-img', {
        left: '135%',
        top: '20rem',
        duration: 200,
        ease: 'inBack'
      }, 750)
      // text initial position
      .add('#brrl-text', {
        opacity: 0,
        translateY: ['-5rem', '0rem'],
        duration: 0
      }, 0)
      // text fades in
      .add('#brrl-text', {
        opacity: [0, 1],
        translateY: ['-5rem', '0rem'],
        duration: 250,
        ease: 'outBack'
      }, 500)


      onScroll({
        target: '#brrl-showcase',
        axis: 'y',
        enter: '50% 0%',
        leave: '100% 100%',
        sync: true
      }).link(tl);
    }
  }

  initBrrlEventsAnimations() {

    animate(svg.createDrawable('.events-header-path'), {
      draw: ['0 0', '0 1'],
      delay: stagger(200),
      autoplay: onScroll({
        target: '#events-showcase',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 20%',
        sync: true
      })
    })
    const tl = createTimeline({
      defaults: {}
    })

    if(window.matchMedia('(orientation: landscape)').matches) {
      // desktop timeline
      // dev hide everything while working
      tl.add('.events-img', {
        translateX: '-200vw',
        duration: 0
      }, 0)
      // #events-description paragraphs fade in
      tl.add('#events-description span', {
        opacity: [0, 1],
        translateY: ['-5rem', '0rem'],
        duration: 100,
        delay: stagger(50)
      }, 0)



    } else {       
      // mobile timeline
      // desktop img starting position in center of screen
      // set to left: 50% to center it at translateX: -50%
      tl.add('#brrl-events-desktop-img', {
        translateX: '-150%',
        rotate: '-10deg',
        duration: 0
      }, 0)
      // mobile img starting position
      .add('#brrl-events-mobile-img', {
        translateX: '-275%',
        translateY: '-10rem',
        rotate: '10deg',
        duration: 0
      }, 0)
      // event creation starting position 
      .add('#brrl-events-creation-img', {
        translateX: '-175%',
        rotate: '-10deg',
        duration: 0
      }, 0)
      // locations img starting position
      .add('#brrl-events-locations-img', {
        translateX: '-175%',
        rotate: '-10deg',
        duration: 0
      }, 0)
      // email img starting position
      .add('#brrl-events-email-img', {
        translateX: '-175%',
        rotate: '-10deg',
        duration: 0
      }, 0)
      // feedback img starting position
      .add('#brrl-events-feedback-img', {
        translateX: '-175%',
        rotate: '-10deg',
        duration: 0
      }, 0)
      // desktop img slides in from the left
      .add('#brrl-events-desktop-img', {
        translateX: '-50%',
        rotate: '0deg',
        translateY: '14rem',
        duration: 250,
        ease: 'outSine'
      }, 1)
      // description fades away/slides up
      .add('#events-description', {
        translateY:  '5rem',
        opacity: [1, 0],
        duration: 50,
      }, 250)
      // features header fades/moves in
      .add('#events-features-header', {
        opacity: [0, 1],
        translateY: ['-5rem', '0rem'],
        duration: 100
      }, 300)
      // desktop img floats up as text becomes smaller
      .add('#brrl-events-desktop-img', {
        translateY: '3rem',
        duration: 100
      }, 300)
      // staff home text fades in
      .add('#staff-home-text', {
        opacity: [0, 1],
        translateY: ['10rem', '18rem'], 
        duration: 100
      }, 300)
      // desktop img floats away
      .add('#brrl-events-desktop-img', {
        translateX: ['110%'],
        translateY: ['10rem'],
        rotate: ['10deg'],
        ease: 'inBack',
        duration: 200
      }, 400)
      .add('#brrl-events-mobile-img', {
        translateX: ['-50%'],
        translateY: ['1rem'],
        rotate: ['-0deg'],
        ease: 'outSine',
        duration: 200
      }, 550)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 550)
      // set initial HTML (helps reset it upon scrolling up)
      .add('#staff-home-text', {
        innerHTML: 'A robust frontend for staff to manage every aspect of event hosting and communication',
        duration: 0
      }, 600)
      // text fades back in
      .add('#staff-home-text', {
        opacity: 1,
        duration: 50
      }, 650)
      // staff home text chages to next feature
      .add('#staff-home-text', {
        innerHTML: 'Fully responsive event pages for patrons to discover events, manage their registrations, pay event fees, and much more',
        duration: 0
      }, 601)
      // mobile img floats away
      .add('#brrl-events-mobile-img', {
        translateX: '200%',
        rotate: '-10deg',
        duration: 150,
        ease: 'inBack'
      }, 800)
      // event creation img floats in
      .add('#brrl-events-creation-img', {
        translateX: '-50%',
        translateY: '3rem', // was -7rem, now +10rem
        rotate: '0deg',
        duration: 250,
        ease: 'outSine'
      }, 900)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 850)
      // set initial HTML (helps reset it upon scrolling up)
      .add('#staff-home-text', {
        innerHTML: 'Fully responsive event pages for patrons to discover events, manage their registrations, pay event fees, and much more',
        translateY: '16rem',
        duration: 0
      }, 900)
      // text fades back in
      .add('#staff-home-text', {
        opacity: 1,
        duration: 50
      }, 950)
      // staff home text chages to next feature
      .add('#staff-home-text', {
        innerHTML: 'Detailed event creation tools to handle age restrictions, custom registration opening/closing dates, promotional images, supply fees, and more',
        duration: 0
      }, 901)
      // event creation img floats away
      .add('#brrl-events-creation-img', {
        translateX: '200%',
        rotate: '10deg',
        duration: 150,
        ease: 'inBack'
      }, 1200)
      // locations img floats in
      .add('#brrl-events-locations-img', {
        translateX: '-50%',
        translateY: '8rem',
        rotate: '0deg',
        duration: 250,
        ease: 'outSine'
      }, 1300)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 1150)
      // set initial HTML (helps reset it upon scrolling up) and move to upper position
      .add('#staff-home-text', {
        innerHTML: 'Detailed event creation tools to handle age restrictions, custom registration opening/closing dates, promotional images, supply fees, and more',
        translateY: '1rem',
        duration: 0
      }, 1200)
      // text fades back in
      .add('#staff-home-text', {
        opacity: 1,
        duration: 50
      }, 1350)
      // staff home text chages to next feature
      .add('#staff-home-text', {
        innerHTML: 'Support for multiple locations/branches, with embeddable schedules to add to any website',
        translateY: '1rem',
        duration: 0
      }, 1201)
      // locations img floats away
      .add('#brrl-events-locations-img', {
        translateX: '200%',
        rotate: '-10deg',
        duration: 150,
        ease: 'inBack'
      }, 1600)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 1550)
      // set initial HTML (helps reset it upon scrolling up)
      .add('#staff-home-text', {
        innerHTML: 'Support for multiple locations/branches, with embeddable schedules to add to any website',
        translateY: '1rem',
        duration: 0
      }, 1600)
      // text fades back in
      .add('#staff-home-text', {
        opacity: 1,
        duration: 50
      }, 1850)
      // staff home text chages to next feature
      .add('#staff-home-text', {
        innerHTML: 'Automated, professional email notifications can be configured for event reminders, cancellations, and more',
        translateY: '20rem',
        duration: 0
      }, 1601)
      // email img floats in
      .add('#brrl-events-email-img', {
        translateX: '-50%',
        translateY: '1rem',
        rotate: '0deg',
        duration: 250,
        ease: 'outSine'
      }, 1800)
      // email img floats away
      .add('#brrl-events-email-img', {
        translateX: '200%',
        rotate: '10deg',
        duration: 150,
        ease: 'inBack'
      }, 2100)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 2050)
      // set initial HTML (helps reset it upon scrolling up)
      .add('#staff-home-text', {
        innerHTML: 'Automated, professional email notifications can be configured for event reminders, cancellations, and more',
        translateY: '1rem',
        duration: 0
      }, 2100)
      // text fades back in
      .add('#staff-home-text', {
        opacity: 1,
        duration: 50
      }, 2250)
      // staff home text chages to next feature
      .add('#staff-home-text', {
        innerHTML: 'Post event surveys collect patron feedback and organize it into a easy-to-read feedback dashboard with analytics',
        translateY: '16rem',
        duration: 0
      }, 2101)
      // feedback img floats in
      .add('#brrl-events-feedback-img', {
        translateX: '-50%',
        translateY: '3rem',
        rotate: '0deg',
        duration: 250,
        ease: 'outSine'
      }, 2200)
      // feedback img floats away
      .add('#brrl-events-feedback-img', {
        translateX: '200%',
        rotate: '-10deg',
        duration: 150,
        ease: 'inBack'
      }, 2500)
      // staff home text (brrl events feature text) fades out
      .add('#staff-home-text', {
        opacity: 0,
        duration: 50
      }, 2450)
    }
    onScroll({
          target: '#events-showcase',
          axis: 'y',
          enter: '50% 0%',
          leave: '100% 100%',
          sync: true
      }).link(tl);
  }

  // contact animations + any other ending animations at bottom of page
  initLastAnimations() {
    if(window.matchMedia('(orientation: landscape)').matches) {
      const tl = createTimeline({
        defaults: {}
      })

      onScroll({
        target: '#contact-container',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 100%',
        sync: true
      }).link(tl);

    } else {
      const tl = createTimeline({
        defaults: {}
      })
      // contact container starting background properties
      .add('#contact-container', {
        background: 'linear-gradient(190deg, #011936 0%, #011936 22%, #57354c 50%, #f84be 100%)',
      })
      // computer desk starting position
      .add('#computer-desk', {
        left: '50%',
        bottom: '-20rem',
        scale: 1,
        width: '300%',
        duration: 0
      }, 0)
      // footer logo starting position
      .add('#footer-logo', {
        left: '-150%',
        top: '-10rem',
        rotate: '-10deg',
        display: 'block',
        duration: 0
      }, 0)
      // footer logo floats in
      .add('#footer-logo', {
        left: '1rem',
        top: '5rem',
        rotate: '0deg',
        duration: 700,
        ease: 'outBack'
      }, 300)
      // computer desk ending position
      .add('#computer-desk', {
        left: '-225%',
        bottom: '-40vh',
        width: '500%',
        scale: 1,
        ease: 'outCirc',
        duration: 600
      }, 1)

      onScroll({
        target: '#contact-container',
        axis: 'y',
        enter: '100% 0%',
        leave: '100% 100%',
        sync: true
      }).link(tl);
    }
  }


  // used on click to enlarge image and move to middle of screen
  // Keep a map so each element remembers its own enlarge animation
  private zoomMap = new Map<string, JSAnimation>();   // JSAnimation is Anime.js’ type

  enlargeImage(selector: string, orientation?: string) {
    // Was this element already enlarged?
    const running = this.zoomMap.get(selector);
    if (running) {
      running.revert();
      this.zoomMap.delete(selector);
      return;
    }

    let anim: JSAnimation | undefined = undefined;

    if(orientation === 'portrait') {
      // Otherwise create the enlarge tween and stash the instance
      anim = animate(selector, {
        scale   : [{ to: 1.5 }],
        top     : [{ to: '-20%' }],
        left    : [{ to: '35%'  }],
        height  : [{ to: '50vh' }],
        width   : [{ to: 'auto'  }],
        rotate  : [{ to: '0deg'  }],
        zIndex  : [{ to: 9_999, duration: 0 }],
        duration: 600,
        ease: 'inOutBack',
        composition: 'replace',
      });
    } else {
      anim = animate(selector, {
        scale   : [{ to: 1.5 }],
        top     : [{ to: '-20%' }],
        left    : [{ to: '30vw'  }],
        height  : [{ to: 'auto'  }],
        width   : [{ to: '40vw' }],
        rotate  : [{ to: '0deg'  }],
        zIndex  : [{ to: 9_999, duration: 0 }],
        duration: 600,
        ease: 'inOutBack',
        composition: 'replace',
      });
    }

    this.zoomMap.set(selector, anim);
  }


  // takes html identifier of element and adds looping 'floaty' animation
  addFloatAnimationToElement(element: string) {
    if(window.matchMedia('(orientation: landscape)').matches) {
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
}
