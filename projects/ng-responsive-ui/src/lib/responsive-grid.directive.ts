import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ResponsiveUiService } from './ng-responsive-ui.service';

@Directive({
  selector: '[responsiveGrid]'
})
export class ResponsiveGridDirective implements OnInit, OnDestroy {

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
    combineLatest([this.rui.columns$, this.rui.gutter$]).pipe(
      debounceTime(0),
      takeUntil(this.unsubscribe)
    ).subscribe(([columns, gutter]) => {
      const newStyle: { [k: string]: any } = {
        display: 'grid',
        'grid-template-columns': `repeat(${columns}, calc((100% - ${(columns - 1) * gutter}px) / ${columns}))`,
        gap: `${gutter}px`
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
