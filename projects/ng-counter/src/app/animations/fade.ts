import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  transition(':enter', [
    animate(".5s", keyframes([
      style({ opacity: 0 }),
      style({ opacity: 1 })
    ]))
  ])
]);
