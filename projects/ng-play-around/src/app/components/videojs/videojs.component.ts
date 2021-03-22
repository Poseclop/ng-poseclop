import { Component, OnInit } from '@angular/core';
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

@Component({
  selector: 'play-around-videojs',
  templateUrl: './videojs.component.html',
  styleUrls: ['./videojs.component.scss']
})
export class VideojsComponent implements OnInit {

  options?: VideoJsPlayerOptions;

  ngOnInit(): void {
    this.options = {
      autoplay: false,
      bigPlayButton: true,
      controls: true,
      muted: true,
      userActions: {
        doubleClick: (event) => {
          console.warn(event);
        }
      },
      sources: [{
        src: '/assets/video/Lorn-Acid-Rain.mp4',
        type: 'video/mp4'
      }]
    }
  }
}
