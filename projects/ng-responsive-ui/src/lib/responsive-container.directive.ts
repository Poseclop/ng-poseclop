import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResponsiveUiService } from './ng-responsive-ui.service';

@Directive({
  selector: '[responsiveContainer]'
})
export class ResponsiveContainerDirective implements OnInit, OnDestroy {

  @Input() verticalMargin = -1;
  @Input() maxWidth = -1;

  private unsubscribe = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private rui: ResponsiveUiService
  ) {
    if (!this.elementRef.nativeElement) {
      throw new Error('ResponsiveContainerDirective can only be attached to an HTMLElement');
    }
  }

  ngOnInit(): void {
    this.rui.gutter$.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(0)
    ).subscribe((gutter) => {
      const newStyle: { [k: string]: any } = {
        width: `calc(100% - 2 * ${gutter} * 1px)`,
        margin: `${this.verticalMargin >= 0 ? this.verticalMargin : gutter}px auto`,
        'max-width': this.maxWidth >= 0 ? `${this.maxWidth}px` : ''
      };

      Object.keys(newStyle).forEach(key => {
        this.elementRef.nativeElement.style.setProperty(`${key}`, newStyle[key]);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
