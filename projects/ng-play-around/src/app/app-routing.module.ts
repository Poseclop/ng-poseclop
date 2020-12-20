import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OnePagerDemoComponent } from './components/one-pager-demo/one-pager-demo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'one-pager', component: OnePagerDemoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
