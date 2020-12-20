import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnePagerContainerComponent } from './pos-page-container.component';
import { OnePagerComponent } from './pos-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OnePagerContainerComponent, OnePagerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [OnePagerContainerComponent, OnePagerComponent]
})
export class NgOnePagerModule { }
