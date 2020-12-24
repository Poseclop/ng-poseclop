import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IImageDialogData {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IImageDialogData
  ) { }

}
