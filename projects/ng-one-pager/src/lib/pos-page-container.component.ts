import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { OnePagerComponent } from './pos-page.component';

export type TPageEvent = {
  previousIndex: number,
  currentIndex: number
};

@Component({
  selector: 'pos-page-container',
  template: `
    <ng-content></ng-content>
    <div class="pos-page-scroller-controls">
        <button class="pos-page-scroller-arrow-button" (click)="previous()" [ngStyle]="{'color': colorIdle}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
        </button>
        <button
          *ngFor="let page of pageQueryList; let i = index"
          [ngClass]="{'selected': pageIndex === i}"
          [ngStyle]="{'background-color': pageIndex === i ? colorActive : colorIdle}"
          class="pos-page-button"
          (click)="scrollToPage(i)">
        </button>
        <button class="pos-page-scroller-arrow-button" (click)="next()" [ngStyle]="{'color': colorIdle}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
    }

    .pos-page-scroller-controls {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pos-page-button {
      width: 12px;
      height: 12px;
      line-height: 12px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      margin: 4px;
      transition: background linear .2s;
    }

    .pos-page-scroller-arrow-button {
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transform: scale(1);
      transition: transform linear .5s;
    }

    .pos-page-scroller-arrow-button svg {
      fill: currentColor;
    }

    .pos-page-scroller-arrow-button:hover {
      transform: scale(1.4);
    }

    .pos-page-button.selected {
      background: rgb(51, 51, 51);
    }

    .pos-page-button:hover {
      background: rgba(120, 120, 120);
    }

    .pos-page-button:focus {
      outline: none;
    }
  `]
})
export class OnePagerContainerComponent implements AfterViewInit {

  /** QueryList of all Pos Page components in container */
  @ContentChildren(OnePagerComponent) pageQueryList?: QueryList<OnePagerComponent>;
  @ContentChild('previousButton') previousButton: any;
  @ContentChild('nextButton') nextButton: any;

  @Output() pageChange = new EventEmitter<TPageEvent>();
  /** Index of the page currently shown on screen */
  @Input() pageIndex = 0;

  /** A number between 1 (low sensivity) and 9 (high sensivity) */
  @Input() scrollSensivity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 5;

  /** The color of the page selection buttons when idle */
  @Input() colorIdle: string | null = null;

  /** The color of the page selection button when active */
  @Input() colorActive: string | null = null;

  /** The width of the scroll bar for current browser */
  scrollBarWidth = 0;
  timeout: any = null;

  private deltaYSum = 0;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {

    const onMouseWheel = (event: WheelEvent): void => {

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.deltaYSum = 0;
      }, 500);

      this.deltaYSum += event.deltaY;

      if (this.deltaYSum > (10 - this.scrollSensivity) * 100) {
        this.next();
        this.deltaYSum = 0;
      } else if (this.deltaYSum < -(10 - this.scrollSensivity) * 100) {
        this.previous();
        this.deltaYSum = 0;
      }

    };

    this.elementRef.nativeElement.addEventListener('wheel', onMouseWheel);

    this.cdr.detectChanges();
  }

  /** Scroll to the next page */
  next(): void {
    if (!this.pageQueryList) { return; }

    if (this.pageIndex < this.pageQueryList.length - 1) {
      this.pageIndex += 1;
      this.scrollToPage();
      this.pageChange.emit({ previousIndex: this.pageIndex - 1, currentIndex: this.pageIndex });
    }
  }

  /** Scroll to the previous page */
  previous(): void {
    if (!this.pageQueryList) { return; }

    if (this.pageIndex > 0) {
      this.pageIndex -= 1;
      this.scrollToPage();
      this.pageChange.emit({ previousIndex: this.pageIndex + 1, currentIndex: this.pageIndex });
    }
  }

  /**
   * Scroll to a specific page (by default, to current page Index)
   * @param index The index of the page to scroll to
   */
  scrollToPage(index?: number): void {

    if (typeof index !== 'undefined') {
      this.pageIndex = index;
    }
    this.elementRef.nativeElement.scroll({ behavior: 'smooth', top: this.elementRef.nativeElement.offsetHeight * this.pageIndex });

  }

}
