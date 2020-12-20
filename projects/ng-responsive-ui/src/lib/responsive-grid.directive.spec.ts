import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, waitForAsync } from '@angular/core/testing';
import { ResponsiveUiService } from 'projects/ng-play-around/src/app/responsive-ui.service';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResponsiveGridDirective } from './responsive-grid.directive';

@Component({
  template: `<p id="testA" responsiveGrid>Test</p>`
})
class TestComponent { }

describe('ResponsiveGridDirective', () => {

  let testBed: TestBedStatic;
  let service: ResponsiveUiService;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    testBed = TestBed.configureTestingModule({
      declarations: [TestComponent, ResponsiveGridDirective],
      providers: [ResponsiveUiService]
    });
    service = testBed.inject(ResponsiveUiService);
    fixture = testBed.createComponent(TestComponent);
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    const directive = new ResponsiveGridDirective(fixture.elementRef, service);
    expect(directive).toBeTruthy();
  });

  it('should set the grid related styles to component', () => {
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('#testA');
    combineLatest([service.columns$, service.gutter$]).pipe(
      take(1)
    ).subscribe(([columns, gutter]) => {
      expect(p.style.display).toBe(`grid`);
      expect(p.style.gridTemplateColumns).toBe(`repeat(${columns}, calc((100% - ${(columns - 1) * gutter}px) / ${columns}))`);
      expect(p.style.gap).toBe(`${gutter}px`);
    });
  });

  it('should throw an error if directive is not attached to an HTML ELment', () => {
    expect(() => new ResponsiveGridDirective('test' as any as ElementRef, service)).toThrowError();
  });
});
