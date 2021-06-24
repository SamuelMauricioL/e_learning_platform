import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradosAcademicosRoutingModule } from './grados-academicos-routing.module';
import { GradosAcademicosComponent } from './grados-academicos.component';


@NgModule({
  declarations: [
    GradosAcademicosComponent
  ],
  imports: [
    CommonModule,
    GradosAcademicosRoutingModule
  ]
})
export class GradosAcademicosModule { }
