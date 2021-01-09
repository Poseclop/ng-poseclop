import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { OnePagerDemoComponent } from './components/one-pager-demo/one-pager-demo.component';
import { NgOnePagerModule } from 'projects/ng-one-pager/src/public-api';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgLoggerServiceModule } from 'projects/ng-logger-service/src/public-api';
import { environment } from 'projects/ng-benoit-tassin/src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnePagerDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOnePagerModule,
    MatButtonModule,
    MatIconModule,
    NgLoggerServiceModule.forRoot(environment.production ? 'ERROR' : 'DEBUG')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
