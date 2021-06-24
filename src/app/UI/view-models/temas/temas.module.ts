import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemasRoutingModule } from './temas-routing.module';
import { TemasComponent } from './temas.component';


@NgModule({
  declarations: [
    TemasComponent
  ],
  imports: [
    CommonModule,
    TemasRoutingModule
  ]
})
export class TemasModule { }
