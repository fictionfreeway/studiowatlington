import { Component, ElementRef, HostListener, inject, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { DarkModeButtonComponent } from '../dark-mode-button/dark-mode-button.component';

import { animate } from 'animejs';

// Import the external template and styles
import template from './home.component.html?raw';
import styles from './home.component.css?inline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, DarkModeButtonComponent],
  template: template || '',
  styles: [styles || '']
})
export class HomeComponent {
  @ViewChild('cloudContainer') cloudContainerRef!: ElementRef<HTMLDivElement>;
  private readonly router   = inject(Router);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private resizeTimeout: any;
  private currentTheme: 'light' | 'dark' = 'light';
  private windowLightInterval: any;

  // Lifecycle hooks
  ngAfterViewInit() {
    this.loadCitySVG();
    window.addEventListener('resize', this.handleResize);
    this.animatePlane();
    this.animateClouds();
    this.initializeAnimations();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Event listeners
  @HostListener('window:resize')
  handleResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.loadCitySVG();
    }, 300); // Debounce resize events
  };

  // Initialization methods
  private initializeAnimations() {
    // Fade in the entire page
    const homeContainer = this.document.getElementById('home-container');
    if (homeContainer) {
      this.renderer.addClass(homeContainer, 'loaded'); // Triggers fade-in
    }

    // horizontal and vertical logo bounce animation from above on load
    animate('#horizontal-logo', {
      y: [
        { to: '-20vh', ease: 'outExpo', duration: 600},
        { to: '0vh', ease: 'outBounce', duration: 800}
      ],
      opacity: [
        { to: 1, duration: 400 }
      ],
      delay: 500,
      ease: 'outBounce',
    })

    animate('#vertical-logo', {
      y: [
        { to: '-20vh', ease: 'outExpo', duration: 600},
        { to: '0vh', ease: 'outBounce', duration: 800}
      ],
      opacity: [
        { to: 1, duration: 400 }
      ],
      delay: 500,
      ease: 'outBounce',
    })

    // Cityscape animation from below on load
    animate('#cityscape-container', {
      y: [
        { to: '40vh', ease: 'outExpo', duration: 600},
        { to: '0vh', ease: 'outBounce', duration: 800}
      ],
      opacity: [
        { to: 0, duration: 200 },
        { to: 1, duration: 400 }
      ],
      delay: 1200,
      ease: 'outBounce',
    })

    // cassette tapes fly in from the sides on load
    animate('#dev-tape-container', {
      x: [
        { to: '-150vw', ease: 'outExpo', duration: 0 },
        { to: '0vw', ease: 'outElastic', duration: 2000 }
      ],
      opacity: [
        { to: 0, duration: 200 },
        { to: 1, duration: 400 }
      ],
      delay: 2000,
      ease: 'outElastic',
    })
    
    animate('#design-tape-container', {
      x: [
        { to: '150vw', ease: 'outExpo', duration: 0 },
        { to: '0vw', ease: 'outElastic', duration: 2000 }
      ],
      opacity: [
        { to: 0, duration: 200 },
        { to: 1, duration: 400 }
      ],
      delay: 3000,
      ease: 'outElastic',
    })

    animate('#design-tape', {
      y: [ '10rem', '12rem' ],
      duration: 4000,
      loop: true,
      alternate: true,
      ease: 'inOutQuad'
    })

    animate('#design-tape', {
      x: [ '-.25rem', '.25rem' ],
      rotate: [ '6deg', '5deg' ],
      duration: 6000,
      loop: true,
      alternate: true,
      ease: 'inOutQuad'
    })
  }

  // SVG loading and animation
  async loadCitySVG() {
    try {
      const response = await fetch('/assets/svg/cityscape.svg');
      const svgText = await response.text();
      const container = document.getElementById('cityscape-container');
      if (!container) return;

      container.innerHTML = ''; // Clear existing SVGs

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = svgText;
      const tempSVG = tempDiv.querySelector('svg');

      if (!tempSVG) return;

      tempSVG.style.maxHeight = '30rem';
      tempSVG.style.height = 'auto';
      tempSVG.style.width = 'auto'; // Allow natural width

      document.body.appendChild(tempDiv);
      const svgWidth = tempSVG.getBoundingClientRect().width;
      document.body.removeChild(tempDiv);

      const containerWidth = container.getBoundingClientRect().width;
      const numRepeats = Math.ceil(containerWidth / svgWidth) + 1;

      for (let i = 0; i < numRepeats; i++) {
        const newSVG = document.createElement('div');
        newSVG.innerHTML = svgText;
        const clonedSVG = newSVG.querySelector('svg');

        if (clonedSVG) {
          clonedSVG.style.maxHeight = '30rem';
          clonedSVG.style.width = 'auto';
          clonedSVG.style.flexShrink = '0';
          container.appendChild(clonedSVG);
        }
      }
      this.setTheme(this.currentTheme);
    } catch (error) {
      console.error('Failed to load SVG:', error);
    }
  }

  private animateWindowsNight() {
    const windows = document.querySelectorAll('.window');
    const buildings = document.querySelectorAll('.st0');
    windows.forEach(window => {
      window.classList.remove('window-day');
      window.classList.remove('window-day-light');
      window.classList.add('window-dark');
      window.classList.remove('window-lit');
    });

    buildings.forEach(building => {
      building.classList.remove('building-day');
    });

    this.windowLightInterval = setInterval(() => {
      if(this.currentTheme === 'dark') {
        windows.forEach(window => {
          if (Math.random() > 0.999) {
            if (window.classList.contains('window-lit')) {
              if(Math.random() > 0.999) {
                window.classList.remove('window-lit');
                window.classList.add('window-dark');
              }
            } else {
              window.classList.remove('window-dark');
              window.classList.add('window-lit');
            }
          }
        });
      }
    }, 75); // Randomly toggle window lights
  }

  private animateWindowsDay() {
    this.windowLightInterval && clearInterval(this.windowLightInterval);
    const windows = document.querySelectorAll('.window');
    const buildings = document.querySelectorAll('.st0');
    windows.forEach(window => {
      window.classList.remove('window-lit');
      window.classList.remove('window-dark');
      window.classList.add('window-day');
    });
    buildings.forEach(building => {
      building.classList.add('building-day');
    });

    this.windowLightInterval = setInterval(() => {
      if(this.currentTheme === 'light') {
        windows.forEach(window => {
          if (Math.random() > 0.99) {
            if (window.classList.contains('window-day')) {
              window.classList.remove('window-day');
              window.classList.add('window-day-light');
            } else {
              window.classList.remove('window-day-light');
              window.classList.add('window-day');
            }
          }
        });
      }
    }, 475); // Randomly toggle window lights
  }

  private setTheme(requestedTheme: any) {
    const homeContainer = document.getElementById('home-container');
    if(requestedTheme === 'dark') {
      homeContainer?.classList.add('dark-mode');
      homeContainer?.classList.remove('light-mode');
      this.animateWindowsNight();
      this.currentTheme = 'dark';
    } else {
      homeContainer?.classList.add('light-mode');
      homeContainer?.classList.remove('dark-mode');
      this.animateWindowsDay();
      this.currentTheme = 'light';
    }
  }

  // Plane animation
  private animatePlane() {
    const plane = document.getElementById('banner-plane-container');
    if (!plane) {
      console.warn("⚠️ Plane element NOT FOUND! Check your template.");
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const duration = 10 + Math.random() * 5;

    const resetPlane = () => {
      if (!plane) return;
      plane.style.transition = 'none';

      const startY = `${screenHeight - (screenHeight * 0.15)}px`;
      plane.style.left = `${screenWidth}px`;
      plane.style.top = startY;
      plane.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;

      setTimeout(() => {
        plane.style.transition = `left ${duration}s linear`;
        plane.style.left = `-200px`;
      }, 100);

      setTimeout(() => {
        resetPlane();
      }, (duration + 8) * 1000);
    };

    resetPlane();
  }

  // Animated fly-away on click for dev tape and routing
  devTapeClicked() {
    // Animate the tape exit
    animate('#dev-tape', {
      x: ['0', '-100vw'],
      rotate: ['-4deg', '-10deg'],
      duration: 500,
      ease: 'inBack'
    });

    setTimeout(() => {
      // Navigate to the development page after animation
      this.router.navigate(['/development']);
    }, 500);
  }

  // Animated fly-away on click for design tape and routing
  designTapeClicked() {
    // Animate the tape exit
    animate('#design-tape', {
      x: ['0', '100vw'],
      rotate: ['6deg', '8deg'],
      duration: 500,
      ease: 'inBack'
    });

    setTimeout(() => {
      // Navigate to the design page after animation
      this.router.navigate(['/design']);
    }, 500);
  }

  // Tape animation with navigation
  animateTapeExit(tapeId: string, direction: 'left' | 'right') {
    const tape = document.getElementById(tapeId);
    if (!tape) {
      console.warn(`⚠️ ${tapeId} NOT FOUND!`);
      return;
    }

    const flyClass = direction === 'right' ? 'fly-away-right' : 'fly-away-left';
    tape.classList.add(flyClass);

    setTimeout(() => {
      console.log(`🚀 ${tapeId} exited, transitioning...`);

      // Navigate to the appropriate route
      if (tapeId === 'dev-tape') {
        this.router.navigate(['/development']);
      } else if (tapeId === 'design-tape') {
        this.router.navigate(['/design']);
      }
    }, 1000);
  }

  // Cloud animation
  private animateClouds() {
    if (!this.cloudContainerRef) return;
    const CLOUD_BASE_SPEED_PX_PER_SEC = 30;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const cloudContainer = this.cloudContainerRef.nativeElement;

    const cloudPaths = [
      '/assets/svg/clouds/Cloud1.svg',
      '/assets/svg/clouds/Cloud2.svg',
      '/assets/svg/clouds/Cloud3.svg',
      '/assets/svg/clouds/Cloud4.svg',
      '/assets/svg/clouds/Cloud5.svg',
      '/assets/svg/clouds/Cloud6.svg',
      '/assets/svg/clouds/Cloud7.svg',
      '/assets/svg/clouds/Cloud8.svg'
    ];

    const spawnCloud = (startOnScreen = false) => {
      const randomIndex = Math.floor(Math.random() * cloudPaths.length);
      const cloudSrc = cloudPaths[randomIndex];

      const cloudEl = document.createElement('img');
      cloudEl.src = cloudSrc;
      cloudEl.classList.add('floating-cloud');

      const widthRem = 2 + Math.random() * 33;
      cloudEl.style.width = `${widthRem}rem`;
      cloudEl.style.height = 'auto';
      cloudEl.style.zIndex = widthRem < 12 ? '100' : '6';
      cloudEl.style.position = 'absolute';
      const containerHeight = cloudContainer.clientHeight || 300;
      const topPos = Math.random() * containerHeight;
      cloudEl.style.top = `${topPos}px`;

      const containerWidthPx = cloudContainer.clientWidth;
      const containerWidthRem = containerWidthPx / rootFontSize;

      const cloudSpeedRemPerSec = (CLOUD_BASE_SPEED_PX_PER_SEC / rootFontSize) * (12 / widthRem);
      let startXRem;

      if (startOnScreen) {
        startXRem = Math.random() * (containerWidthRem - widthRem);
      } else {
        startXRem = -(widthRem + 5);
      }
      cloudEl.style.left = `${startXRem}rem`;

      const totalTravelDistanceRem = (containerWidthRem - startXRem) + widthRem + 10;
      const crossTime = totalTravelDistanceRem / cloudSpeedRemPerSec;

      cloudContainer.appendChild(cloudEl);

      setTimeout(() => {
        cloudEl.style.transition = `transform ${crossTime}s linear`;
        cloudEl.style.transform = `translateX(${totalTravelDistanceRem}rem)`;
      }, 50);

      setTimeout(() => {
        if (cloudEl.parentElement === cloudContainer) {
          cloudContainer.removeChild(cloudEl);
        }
      }, (crossTime * 1000) + 5000);
    };

    const cloudsToSpawn = Math.min(Math.floor(window.innerWidth / 200), 7);
    for (let i = 0; i < cloudsToSpawn; i++) {
      spawnCloud(true);
    }
    for (let i = 0; i < 1; i++) {
      spawnCloud(false);
    }
    setInterval(() => spawnCloud(false), 8000);
  }
}