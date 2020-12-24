import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  smallScreen$: Observable<boolean>;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    observer: BreakpointObserver,
  ) {
    this.registerIcons(iconRegistry, sanitizer);
    this.smallScreen$ = observer.observe('(max-width: 450px)').pipe(
      map(breakpoints => breakpoints.matches)
    );
  }

  private registerIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/facebook.svg'));
    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/linkedin.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/github.svg'));
    iconRegistry.addSvgIcon('npm', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/npm.svg'));
  }

}
