import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePlayComponent } from './course-play.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [CoursePlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: CoursePlayComponent }
    ]),
    ComponentsModule
  ]
})
export class CoursePlayModule { }
