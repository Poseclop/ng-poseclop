import { animate, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { fadeIn } from './animations/fade';
import { CounterComponent } from './components/counter/counter.component';

type CounterRef = { childs: CounterRef[], counter?: CounterComponent };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-counter';
  @ViewChild('counter') counter?: CounterComponent;

  counters?: CounterRef;

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {

    if (this.counter) {
      this.counters = { childs: [], counter: this.counter };
    }
  }
}
