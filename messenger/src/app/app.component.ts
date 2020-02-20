import { Component } from '@angular/core';
import { routerAnimations } from './shared/animations/components-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent {

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData['state'];
  }
}
