import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePagerDemoComponent } from './one-pager-demo.component';

describe('OnePagerDemoComponent', () => {
  let component: OnePagerDemoComponent;
  let fixture: ComponentFixture<OnePagerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePagerDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePagerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
