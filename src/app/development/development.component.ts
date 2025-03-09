import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import template from './development.component.html?raw';
import styles from './development.component.css?inline';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  template: template || '',
  styles: [styles || '']
})


export class DevelopmentComponent {

  ngOnInit() {
    console.log('DevelopmentComponent initialized');
  }
 
}
