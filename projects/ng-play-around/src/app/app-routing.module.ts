import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationsComponent } from './components/animations/animations.component';
import { CognitoComponent } from './components/cognito/cognito.component';
import { HomeComponent } from './components/home/home.component';
import { OnePagerDemoComponent } from './components/one-pager-demo/one-pager-demo.component';
import { VideojsComponent } from './components/videojs/videojs.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'one-pager', component: OnePagerDemoComponent },
  { path: 'cognito', component: CognitoComponent },
  { path: 'animations', component: AnimationsComponent },
  { path: 'videojs', component: VideojsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
