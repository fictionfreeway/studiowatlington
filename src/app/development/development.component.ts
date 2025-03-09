import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import template from './development.component.css?raw';
import styles from './development.component.css?raw';

@Component({
  selector: 'app-development',
  standalone: true,
  template: template || '',
  styles: [styles || '']
})


export class DevelopmentComponent {

  ngOnInit() {
    console.log('DevelopmentComponent initialized');
  }
 
}
