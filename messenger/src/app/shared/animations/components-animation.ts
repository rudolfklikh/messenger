import { trigger, transition, useAnimation } from '@angular/animations';
import { rotateInDownLeft, rotateInDownRight, zoomIn } from 'ng-animate';

export const routerAnimations = trigger('routerAnimations', [
  transition('login => registration', [
    useAnimation(rotateInDownLeft, {
      params: {
        timing: 0.5
      }
    })
  ]),
  transition('registration => login', [
    useAnimation(rotateInDownRight, {
      params: {
        timing: 0.5
      }
    })
  ]),
  transition('registration <=> reset', [
    useAnimation(zoomIn, {
      params: {
        timing: 0.5
      }
    })
  ]),
  transition('login <=> reset', [
    useAnimation(zoomIn, {
      params: {
        timing: 0.5
      }
    })
  ]),
  transition('verify <=> login', [
    useAnimation(zoomIn, {
      params: {
        timing: 0.5
      }
    })
  ]),
]);
