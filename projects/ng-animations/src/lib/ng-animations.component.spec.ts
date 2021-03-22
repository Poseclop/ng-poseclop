import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAnimationsComponent } from './ng-animations.component';

describe('NgAnimationsComponent', () => {
  let component: NgAnimationsComponent;
  let fixture: ComponentFixture<NgAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAnimationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
