import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'pos-page',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host(pos-page) {
      display: inline-block;
      height: 100%;
      width: 100vw;
    }
  `]
})
export class OnePagerComponent {

  constructor(
    public elementRef: ElementRef<HTMLElement>
  ) {
    elementRef.nativeElement.classList.add('page');
  }

}
