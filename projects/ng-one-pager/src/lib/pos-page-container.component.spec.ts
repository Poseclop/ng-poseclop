import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePagerContainerComponent } from './pos-page-container.component';

describe('OnePagerContainerComponent', () => {
  let component: OnePagerContainerComponent;
  let fixture: ComponentFixture<OnePagerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePagerContainerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePagerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
