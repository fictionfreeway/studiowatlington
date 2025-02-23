import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

// Import the external template and styles
import template from './home.component.html?raw';
import styles from './home.component.css?inline';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, RouterLink, RouterModule],
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})

export class HomeComponent {
  @ViewChild('cloudContainer') cloudContainerRef!: ElementRef<HTMLDivElement>;

  private resizeTimeout: any; // Holds timeout ID for debounce
  private router = inject(Router);

  // 1️⃣ Inject the Router
  constructor() {}

  ngAfterViewInit() {
    this.loadSVG();
    window.addEventListener('resize', this.handleResize);
    this.animatePlane();
    this.animateClouds();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  @HostListener('window:resize')
  handleResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.loadSVG();
    }, 300);
  };

  async loadSVG() {
    try {
      const response = await fetch('/assets/svg/cityscape.svg');
      const svgText = await response.text();
      const container = document.getElementById('cityscape-container');
      if (!container) return;

      container.innerHTML = '';

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

      this.animateWindows();
    } catch (error) {
      console.error('Failed to load SVG:', error);
    }
  }

  animateWindows() {
    const windows = document.querySelectorAll('.window');
  
    setInterval(() => {
      windows.forEach(window => {
        if (Math.random() > 0.999) {
          if (window.classList.contains('window-lit')) {
            window.classList.remove('window-lit');
            window.classList.add('window-dark');
          } else {
            window.classList.remove('window-dark');
            window.classList.add('window-lit');
          }
        }
      });
    }, 400);
  }

  animatePlane() {
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

  // 2️⃣ Updated to use Router navigation after tape exits
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

      // 3️⃣ Use router to navigate to the route you want
      //    Update '/next-route' to whatever route you like
      if(tapeId === 'dev-tape') {
        this.router.navigate(['/development']);
      } else if(tapeId === 'design-tape') {
        this.router.navigate(['/design']);
      }
      
    }, 1000);
  }

  animateClouds() {
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
      cloudEl.style.zIndex = widthRem < 12 ? '100' : '10';
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
        startXRem = - (widthRem + 5);
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
