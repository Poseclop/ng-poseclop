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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgLoggerServiceModule } from 'projects/ng-logger-service/src/public-api';
import { environment } from 'projects/ng-benoit-tassin/src/environments/environment';
import { CognitoComponent } from './components/cognito/cognito.component';
import { NgCognitoServiceModule } from 'projects/ng-cognito/src/public-api';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { NgTypedFormModule } from 'projects/ng-typed-form/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimationsComponent } from './components/animations/animations.component';
import { NgVideojsModule } from 'projects/ng-videojs/src/public-api';
import { VideojsComponent } from './components/videojs/videojs.component';

const userPool: CognitoUserPool = new CognitoUserPool({
  UserPoolId: "eu-west-1_D8ajYgPpl",
  ClientId: "2tt2o3qnt64r86djk275qtd9vc"
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnePagerDemoComponent,
    CognitoComponent,
    AnimationsComponent,
    VideojsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOnePagerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgLoggerServiceModule.forRoot(environment.production ? 'error' : 'debug'),
    NgCognitoServiceModule.forRoot(userPool),
    NgTypedFormModule,
    ReactiveFormsModule,
    NgVideojsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
