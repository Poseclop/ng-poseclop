import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLoggerServiceComponent } from './ng-logger-service.component';

describe('NgLoggerServiceComponent', () => {
  let component: NgLoggerServiceComponent;
  let fixture: ComponentFixture<NgLoggerServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgLoggerServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLoggerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
