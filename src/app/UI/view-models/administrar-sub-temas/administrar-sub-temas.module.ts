import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarSubTemasRoutingModule } from './administrar-sub-temas-routing.module';
import { AdministrarSubTemasComponent } from './administrar-sub-temas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministrarSubTemasComponent
  ],
  imports: [
    CommonModule,
    AdministrarSubTemasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministrarSubTemasModule { }
