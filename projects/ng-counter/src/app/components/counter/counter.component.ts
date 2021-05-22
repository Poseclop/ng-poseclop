import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { v4 } from 'uuid';
import { fadeIn } from '../../animations/fade';

@Component({
  selector: 'ng-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  animations: [fadeIn]
})
export class CounterComponent {

  @ViewChild('titleRef') titleRef?: ElementRef<HTMLInputElement>;

  @Input() title = '';
  @Output() incrementParent = new EventEmitter<number>();

  level = 0;
  counter = 0;
  id = v4();
  childs: string[] = [];

  increment(n = 1): void {

    const result = this.counter + n;

    if (result >= 0) {
      this.counter = result
    } else {
      this.counter = 0;
    }

    this.incrementParent.emit(n);
  }

  addChild(): void {
    this.childs.push('');
  }

  onTitleClick(): void {
    this.titleRef?.nativeElement.select();
  }

}
