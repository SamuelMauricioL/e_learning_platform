import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarTemasRoutingModule } from './administrar-temas-routing.module';
import { AdministrarTemasComponent } from './administrar-temas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministrarTemasComponent
  ],
  imports: [
    CommonModule,
    AdministrarTemasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministrarTemasModule { }
