import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CoreRoutes } from './core.routes';

const routes: Routes = [
  { path: CoreRoutes.home, component: HomeComponent },
  { path: CoreRoutes['about-me'], component: AboutMeComponent },
  { path: CoreRoutes.projects, component: ProjectsComponent },
  { path: '', pathMatch: 'full', redirectTo: CoreRoutes.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
