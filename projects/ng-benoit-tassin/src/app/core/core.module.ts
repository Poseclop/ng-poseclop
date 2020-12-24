import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ToolBottomSheetComponent } from './components/tool-bottom-sheet/tool-bottom-sheet.component';



@NgModule({
  declarations: [
    AboutMeComponent,
    FooterComponent,
    HomeComponent,
    ImageDialogComponent,
    NavigationComponent,
    ProjectsComponent,
    ToolBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
