import { Component, HostListener } from '@angular/core';
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
  private resizeTimeout: any; // Holds timeout ID for debounce

  ngAfterViewInit() {
    this.loadSVG();
    window.addEventListener('resize', this.handleResize);
    this.animatePlane();
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
          clonedSVG.style.maxHeight = '25rem';
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
        if (Math.random() > 0.996) { // 20% chance to toggle each cycle
          window.setAttribute('fill', window.getAttribute('fill') === 'black' ? '#fccf03' : 'black');
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

}
