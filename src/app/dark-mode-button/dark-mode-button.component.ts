import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { animate } from 'animejs';

// Import the external template and styles
import template from './dark-mode-button.component.html?raw';
import styles from './dark-mode-button.component.css?inline';

@Component({
    selector: 'app-dark-mode-button',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule],
    template: template || '', // ✅ External template
    styles: [styles || '']
})

export class DarkModeButtonComponent {

    toggleDarkMode() {
        this.animateButtonToggle();
    }

    animateButtonToggle() {
        animate('#sun', {
            rotate: [ '0deg', '360deg' ],
            loop: true,
            ease: 'linear'
        })

        animate('#sun-moon-container', {
            translateX: [ '0%', '40%' ],
            ease: 'easeInOutSine',
            duration: 1000
        })
    }

}