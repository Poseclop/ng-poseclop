import { animate, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { bounce, flash, pulse, rubberBand, shakeX } from 'projects/ng-animations/src/lib/models/animations';

@Component({
  selector: 'play-around-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    trigger('rubberBand', [
      transition('* => *', [
        animate("1s", rubberBand)
      ])
    ]),
    trigger('bounce', [
      transition('* => *', [
        animate(".5s", bounce)
      ])
    ]),
    trigger('flash', [
      transition('* => *', [
        animate(".5s", flash)
      ])
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate(".5s", pulse)
      ])
    ]),
    trigger('shakeX', [
      transition('* => *', [
        animate(".5s", shakeX)
      ])
    ])
  ]
})
export class AnimationsComponent {
  rubberBand = true;
  bounce = true;
  flash = true;
  pulse = true;
  shakeX = true;
}
