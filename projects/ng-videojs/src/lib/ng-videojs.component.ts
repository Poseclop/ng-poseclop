import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VideoJsPlayer, VideoJsPlayerOptions, VideoJsPlayerPluginOptions } from 'video.js';
import videojs from 'video.js';
import 'videojs-landscape-fullscreen'

@Component({
  selector: 'ng-videojs',
  template: `
    <video #target class="video-js"></video>
  `,
  styleUrls: ['./ng-videojs.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NgVideojsComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target?: ElementRef<HTMLVideoElement>;

  // see options: https://github.com/videojs/video.js/blob/maintutorial-options.html
  @Input() options?: VideoJsPlayerOptions;

  player?: VideoJsPlayer;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {

    if (this.target) {
      this.player = videojs(this.target.nativeElement, this.options, () => {
        console.warn(this)
      });


      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true
      }
    })
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
