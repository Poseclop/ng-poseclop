import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { TCardDetail } from '../home/home.component';

@Component({
  selector: 'app-tool-bottom-sheet',
  templateUrl: './tool-bottom-sheet.component.html',
  styleUrls: ['./tool-bottom-sheet.component.scss']
})
export class ToolBottomSheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: TCardDetail,
    public bottomSheet: MatBottomSheetRef
  ) { }
}
