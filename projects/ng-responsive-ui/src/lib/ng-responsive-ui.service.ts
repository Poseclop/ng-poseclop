import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ScreenLayout = 'HandsetLandscape' | 'HandsetPortrait' | 'TabletLandscape' | 'TabletPortrait' | 'WebLandscape' | 'WebPortrait';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveUiService {

  private columns = new BehaviorSubject<number>(12);
  private screenLayout = new BehaviorSubject<ScreenLayout>('WebLandscape');
  private gutter = new BehaviorSubject<number>(24);

  /** Responsive gutter / margin size */
  get gutter$(): Observable<number> {
    return this.gutter.asObservable();
  }

  /** Responsive number of columns */
  get columns$(): Observable<number> {
    return this.columns.asObservable();
  }

  /** Screen Layout Observable */
  get screenLayout$(): Observable<ScreenLayout> {
    return this.screenLayout.asObservable();
  }

  constructor(
    observer: BreakpointObserver
  ) {
    observer.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait
    ]).subscribe(state => {
      switch (true) {
        case state.breakpoints[Breakpoints.HandsetPortrait]:
          this.screenLayout.next('HandsetPortrait');
          this.gutter.next(16);
          this.columns.next(4);
          break;
        case state.breakpoints[Breakpoints.HandsetLandscape]:
          this.screenLayout.next('HandsetLandscape');
          this.gutter.next(16);
          this.columns.next(8);
          break;
        case state.breakpoints[Breakpoints.TabletPortrait]:
          this.screenLayout.next('TabletPortrait');
          this.gutter.next(24);
          this.columns.next(8);
          break;
        case state.breakpoints[Breakpoints.TabletLandscape]:
          this.screenLayout.next('TabletLandscape');
          this.gutter.next(24);
          this.columns.next(12);
          break;
        case state.breakpoints[Breakpoints.WebPortrait]:
          this.screenLayout.next('WebPortrait');
          this.gutter.next(24);
          this.columns.next(12);
          break;
        case state.breakpoints[Breakpoints.WebLandscape]:
          this.screenLayout.next('WebLandscape');
          this.gutter.next(24);
          this.columns.next(12);
          break;
      }
    });
  }
}
