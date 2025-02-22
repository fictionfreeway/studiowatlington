import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Import the external template and styles
import template from './home.component.html?raw';
import styles from './home.component.css?inline';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Required since we're not using an NgModule
  imports: [CommonModule, RouterLink], // Allows *ngIf, *ngFor, etc.
  template: template || '', // ✅ External template
  styles: [styles || ''] // ✅ External styles (optional)
})
export class HomeComponent {
  // Bind to the #cloudContainer in the template
  @ViewChild('cloudContainer') cloudContainerRef!: ElementRef<HTMLDivElement>;

  private resizeTimeout: any; // Holds timeout ID for debounce

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
    clearTimeout(this.resizeTimeout); // Clear previous timeout
    this.resizeTimeout = setTimeout(() => {
      this.loadSVG(); // Reload the SVG with updated dimensions
    }, 300); // Debounce: 300ms to prevent excessive calls
  };

  async loadSVG() {
    try {
      const response = await fetch('/assets/svg/cityscape.svg');
      const svgText = await response.text();
      const container = document.getElementById('cityscape-container');
      if (!container) return;

      // Clear existing content
      container.innerHTML = '';

      // Create a temporary SVG element to measure its width
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

      // Determine how many times we need to repeat the SVG
      const containerWidth = container.getBoundingClientRect().width;
      const numRepeats = Math.ceil(containerWidth / svgWidth) + 1;

      // Append multiple SVGs to create tiling effect
      for (let i = 0; i < numRepeats; i++) {
        const newSVG = document.createElement('div');
        newSVG.innerHTML = svgText;
        const clonedSVG = newSVG.querySelector('svg');

        if (clonedSVG) {
          clonedSVG.style.maxHeight = '30rem';
          clonedSVG.style.width = 'auto';
          clonedSVG.style.flexShrink = '0'; // Prevents resizing in flexbox
          container.appendChild(clonedSVG);
        }
      }

      // Animate windows in all instances
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
            // Turn the window dark
            window.classList.remove('window-lit');
            window.classList.add('window-dark');
          } else {
            // Light it up with a glow
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

    const duration = 10 + Math.random() * 5; // Random flight duration (10-15s)

    function resetPlane() {
        // Reset position first (without animation)
        if (!plane) return;
        plane.style.transition = 'none';

        const startY = `${screenHeight - (screenHeight * 0.15)}px`; // 15vh from bottom
        plane.style.left = `${screenWidth}px`; // Start off-screen right
        plane.style.top = startY; // Corrected vertical position
        plane.style.transform = `scale(${Math.random() * 0.4 + 0.8})`; // Slight size variation

        console.log(`✈️ Plane spawning at ${screenWidth}px, ${startY}`);

        // Wait a tiny moment before starting horizontal flight
        setTimeout(() => {
            plane.style.transition = `left ${duration}s linear`; // 10-15s flight time
            plane.style.left = `-200px`; // Move left off-screen
            console.log(`🚀 Plane flying left`);
        }, 100);

        // When flight is done, reset after a delay
        setTimeout(() => {
            resetPlane();
        }, (duration + 8) * 1000); // Delay before respawn
    }

    resetPlane(); // Start animation loop
  }

  animateTapeExit(tapeId: string, direction: 'left' | 'right') {
    const tape = document.getElementById(tapeId);

    if (!tape) {
      console.warn(`⚠️ ${tapeId} NOT FOUND!`);
      return;
    }

    // Add appropriate fly-away class based on direction
    const flyClass = direction === 'right' ? 'fly-away-right' : 'fly-away-left';
    tape.classList.add(flyClass);

    // Trigger transition animation after animation ends
    setTimeout(() => {
      console.log(`🚀 ${tapeId} exited, transitioning...`);
      // Add route navigation or component transition logic here
    }, 1000); // Matches CSS animation duration (1s)
  }

  animateClouds() {
    if (!this.cloudContainerRef) return;
  
    const CLOUD_BASE_SPEED_PX_PER_SEC = 30; // Base speed in px/sec
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Convert 1rem to px
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
  
      // Random width in rem (minimum 2rem, max 35rem)
      const widthRem = 2 + Math.random() * 33;
      cloudEl.style.width = `${widthRem}rem`;
      cloudEl.style.height = 'auto';
  
      // Adjust z-index based on size
      cloudEl.style.zIndex = widthRem < 12 ? '100' : '10'; // Smaller clouds appear in front
  
      // Positioning
      cloudEl.style.position = 'absolute';
      const containerHeight = cloudContainer.clientHeight || 300;
      const topPos = Math.random() * containerHeight;
      cloudEl.style.top = `${topPos}px`;
  
      // Convert container width to rem
      const containerWidthPx = cloudContainer.clientWidth;
      const containerWidthRem = containerWidthPx / rootFontSize;
  
      // Slower movement for larger clouds:
      // - The speed scales **inversely** with cloud size, so large clouds move slower.
      const cloudSpeedRemPerSec = (CLOUD_BASE_SPEED_PX_PER_SEC / rootFontSize) * (12 / widthRem); 
  
      let startXRem;
      if (startOnScreen) {
        // Start somewhere random **within** the screen
        startXRem = Math.random() * (containerWidthRem - widthRem);
      } else {
        // Start **off-screen** (normal behavior)
        startXRem = - (widthRem + 5);
      }
      cloudEl.style.left = `${startXRem}rem`;
  
      // Calculate full travel distance (from current position to fully off-screen right)
      const totalTravelDistanceRem = (containerWidthRem - startXRem) + widthRem + 10; // Ensure full exit
  
      // Calculate duration based on adjusted speed
      const crossTime = totalTravelDistanceRem / cloudSpeedRemPerSec;
  
      // Append to DOM
      cloudContainer.appendChild(cloudEl);
  
      // Small delay before starting transition
      setTimeout(() => {
        cloudEl.style.transition = `transform ${crossTime}s linear`;
        cloudEl.style.transform = `translateX(${totalTravelDistanceRem}rem)`;
      }, 50);
  
      // Remove after it's fully off-screen
      setTimeout(() => {
        if (cloudEl.parentElement === cloudContainer) {
          cloudContainer.removeChild(cloudEl);
        }
      }, (crossTime * 1000) + 5000); // Give it extra 5s buffer
    };
  
    // Spawn 2/3 of the clouds already **on screen** when the page loads
    for (let i = 0; i < 2; i++) {
      spawnCloud(true);
    }
  
    // Spawn 1/3 normally (off-screen to the left)
    for (let i = 0; i < 1; i++) {
      spawnCloud(false);
    }
  
    // Spawn new clouds at regular intervals
    setInterval(() => spawnCloud(false), 8000);
  }
  
  
  
  
  
  
  
  
  
  


}
