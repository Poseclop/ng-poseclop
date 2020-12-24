import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBottomSheetComponent } from './tool-bottom-sheet.component';

describe('ToolBottomSheetComponent', () => {
  let component: ToolBottomSheetComponent;
  let fixture: ComponentFixture<ToolBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
