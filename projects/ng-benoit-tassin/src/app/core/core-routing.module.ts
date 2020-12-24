import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { coreRoutes } from './core.routes';

const routes: Routes = [
  { path: coreRoutes.HOME, component: HomeComponent },
  { path: coreRoutes.ABOUT_ME, component: AboutMeComponent },
  { path: coreRoutes.PROJECTS, component: ProjectsComponent },
  { path: '', pathMatch: 'full', redirectTo: coreRoutes.HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
