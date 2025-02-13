import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Animate leaving page (slide out left)
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: 1 }),
          animate('300ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ], { optional: true }),

        // Animate entering page (slide in from right)
        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('300ms ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  constructor() {
    console.log('AppComponent running');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
