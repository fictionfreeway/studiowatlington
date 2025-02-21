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
        }, (duration + 3) * 1000); // Delay before respawn
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
  
    // A simple, constant speed in px/second.
    const CLOUD_SPEED_PX_PER_SEC = 30;
  
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
  
    const spawnCloud = () => {
      const randomIndex = Math.floor(Math.random() * cloudPaths.length);
      const cloudSrc = cloudPaths[randomIndex];
  
      const cloudEl = document.createElement('img');
      cloudEl.src = cloudSrc;
      cloudEl.classList.add('floating-cloud');
  
      const widthToSet = 1 + Math.random() * 35;
      cloudEl.style.width = `${widthToSet}rem`;
      cloudEl.style.height = 'auto'; // Maintain aspect ratio
  
      // Optionally vary z-index based on size (bigger could be "closer" or "behind")
      if (widthToSet < 12) {
        cloudEl.style.zIndex = '100'; // in front
      } else {
        cloudEl.style.zIndex = '10';   // behind
      }
  
      // Absolutely position the cloud
      cloudEl.style.position = 'absolute';
  
      // Random vertical position within container
      const containerHeight = cloudContainer.clientHeight || 300;
      const topPos = Math.random() * (containerHeight);
      cloudEl.style.top = `${topPos}px`;
  
      // Place the cloud off-screen on the left initially
      // We'll use transform to start it even further left
      cloudEl.style.left = '-0vw';
      // Start it fully off-screen to the left by a bit more than its width
      cloudEl.style.transform = `translateX(-${widthToSet + 5}rem)`;
  
      // Append it to the container
      cloudContainer.appendChild(cloudEl);
  
      // After a tiny delay, set the transition and move it across
      setTimeout(() => {
        // Calculate how far it needs to travel: total distance from (just off-screen) to beyond container
        const containerWidth = cloudContainer.clientWidth;
        const totalTravelDistance = containerWidth + widthToSet + 100; 
          // e.g. if containerWidth = 1200 and cloud width ~150 => 1450 px
  
        // Time (in seconds) = distance / speed
        const crossTime = totalTravelDistance / CLOUD_SPEED_PX_PER_SEC;
  
        // Apply transition for that computed duration
        cloudEl.style.transition = `transform ${crossTime}s linear`;
  
        // Move it fully to the right, beyond container
        cloudEl.style.transform = `translateX(${totalTravelDistance}px)`;
      }, 50); // small delay so we can set up initial position before transition
  
      // Clean up after it drifts out of view
      // Wait crossTime + a buffer so we don't remove it too early
      setTimeout(() => {
        if (cloudEl.parentElement === cloudContainer) {
          cloudContainer.removeChild(cloudEl);
        }
      }, 60000); // 1 min is plenty; or crossTime * 1000 + some buffer
    };
  
    // Spawn new clouds at intervals
    setInterval(spawnCloud, 8000); // e.g. every 8s
  
    // Spawn a few immediately so they're visible right away
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnCloud, i * 2000);
    }
  }
  
  
  
  
  


}
