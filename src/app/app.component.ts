import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

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
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
          optional: true
        }),
        group([
          // Slide out current component to the left
          query(
            ':leave',
            [
              animate(
                '300ms ease-in-out',
                style({ transform: 'translateX(-100%)', opacity: 0 })
              )
            ],
            { optional: true }
          ),
          // Slide in new component from the right
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)', opacity: 0 }),
              animate(
                '300ms ease-in-out',
                style({ transform: 'translateX(0)', opacity: 1 })
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private router: Router) {
    console.log('AppComponent running');
  }

  prepareRoute(outlet: RouterOutlet) {
    // Only animate if there's a "previousNavigation".
    // No previous navigation => user typed URL or refreshed => no animation
    const currentNav = this.router.getCurrentNavigation();
    if (currentNav && currentNav.previousNavigation) {
      return outlet?.activatedRouteData?.['animation'];
    }
    return null;
  }
}
