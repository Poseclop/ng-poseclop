import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgVideojsComponent } from './ng-videojs.component';

describe('NgVideojsComponent', () => {
  let component: NgVideojsComponent;
  let fixture: ComponentFixture<NgVideojsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgVideojsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgVideojsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
