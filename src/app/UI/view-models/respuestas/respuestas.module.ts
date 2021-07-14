import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespuestasRoutingModule } from './respuestas-routing.module';
import { RespuestasComponent } from './respuestas.component';


@NgModule({
  declarations: [
    RespuestasComponent
  ],
  imports: [
    CommonModule,
    RespuestasRoutingModule
  ]
})
export class RespuestasModule { }
