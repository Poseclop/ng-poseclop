import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic, waitForAsync } from '@angular/core/testing';
import { ResponsiveUiService } from './ng-responsive-ui.service';
import { take } from 'rxjs/operators';
import { ResponsiveContainerDirective } from './responsive-container.directive';

@Component({
  template: `
    <p id="testA" responsiveContainer [ngStyle]="{'background': 'red' }">Test A</p>
    <p id="testB" responsiveContainer [verticalMargin]="56" [ngStyle]="{'background': 'green' }">Test B</p>
    <p id="testC" responsiveContainer [maxWidth]="1200" [ngStyle]="{'background': 'blue' }">Test C</p>
    <p id="testD" responsiveContainer [ngStyle]="{'background': 'grey'}">Test D</p>
  `
})
class TestComponent { }

describe('ResponsiveContainerDirective', () => {

  let testBed: TestBedStatic;
  let service: ResponsiveUiService;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    testBed = TestBed.configureTestingModule({
      declarations: [TestComponent, ResponsiveContainerDirective],
      providers: [ResponsiveUiService]
    });
    service = testBed.inject(ResponsiveUiService);
    fixture = testBed.createComponent(TestComponent);
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    const directive = new ResponsiveContainerDirective(fixture.elementRef, service);
    expect(directive).toBeTruthy();
  });

  it('should set the default margin and width to component', () => {
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('#testA');
    service.gutter$.pipe(
      take(1)
    ).subscribe(gutter => {
      expect(p.style.width).toBe(`calc(100% - ${2 * gutter}px)`);
      expect(p.style.margin).toBe(`${gutter}px auto`);
    });
  });

  it('should use the vertical margin provided in input', () => {
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('#testB');
    expect(p.style.margin).toBe(`56px auto`);
  });

  it('should use the max-width provided in input', () => {
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('#testC');
    expect(p.style.maxWidth).toBe(`1200px`);
  });

  it('should throw an error if directive is not attached to an HTML ELment', () => {
    expect(() => new ResponsiveContainerDirective('test' as any as ElementRef, service)).toThrowError();
  });
});
