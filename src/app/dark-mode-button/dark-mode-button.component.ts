import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { animate } from 'animejs';

// Import the external template and styles
import template from './dark-mode-button.component.html?raw';
import styles from './dark-mode-button.component.css?inline';


@Component({
    selector: 'app-dark-mode-button',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule],
    encapsulation: ViewEncapsulation.None,
    template: template || '',
    styles: [styles || '']
})

export class DarkModeButtonComponent implements OnInit {

    @Output() themeChange = new EventEmitter<'light' | 'dark'>();

    darkModeActive: boolean; // Default to light mode
    prefersDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

    constructor() {
        this.darkModeActive = this.prefersDarkMode;
    }

    ngOnInit(): void {
        if(this.darkModeActive) {
            this.animateButtonToggle();
            this.themeChange.emit('dark');
        } else {
            this.animateButtonToggle();
            this.themeChange.emit('light');
        }
        animate('#sun, #moon', {
            scale: [ '1.4' ],
            duration: 0,
            ease: 'linear'
        })
    }

    toggleDarkMode() {
        this.darkModeActive = !this.darkModeActive;
        this.animateButtonToggle();

        this.themeChange.emit(this.darkModeActive ? 'dark' : 'light');
    }

    animateButtonToggle() {
        if(!this.darkModeActive) {
            
            // sun opacity to 0 as moon opacity to 1
            animate('#sun', {
                opacity: [ '0', '1' ],
                ease: 'outSine',
                delay: 100,
                duration: 150
            })

            animate('#moon', {
                opacity: [ '1', '0' ],
                ease: 'inSine',
                delay: 100,
                duration: 150
            })

            animate('#sun', {
                rotate: [ '260deg', '0deg' ],
                duration: 400,
                ease: 'linear'
            })
    
            animate('#moon', {
                rotate: [ '260deg', '0deg' ],
                duration: 400,
                ease: 'linear'
            })
    
            animate('#sun-moon-container', {
                translateX: [ '50%', '0%' ],
                ease: 'outBounce',
                duration: 700
            })
        } else {
            animate('#sun', {
                rotate: [ '260deg', '0deg' ],
                duration: 400,
                ease: 'linear'
            })

            animate('#sun', {
                opacity: [ '1', '0' ],
                ease: 'inSine',
                delay: 100,
                duration: 150
            })
    
            animate('#moon', {
                rotate: [ '0deg', '260deg' ],
                duration: 400,
                ease: 'linear'
            })

            animate('#moon', {
                opacity: [ '0', '1' ],
                ease: 'outSine',
                delay: 100,
                duration: 150
            })
    
            animate('#sun-moon-container', {
                translateX: [ '0%', '50%' ],
                ease: 'outBounce',
                duration: 700
            })
        }
    }

}