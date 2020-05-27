import { Component, HostListener, OnInit } from '@angular/core';
import { routerAnimations } from './shared/animations/components-animation';
import { RouterOutlet } from '@angular/router';
import { UtilsService } from './shared/services/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent {
  constructor(private utilsService: UtilsService) {}

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
        const screenSize = event.target.innerWidth;
        this.utilsService.onResize(screenSize);
    }
}
