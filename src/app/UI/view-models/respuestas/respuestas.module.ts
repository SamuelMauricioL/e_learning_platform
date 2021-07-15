import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespuestasRoutingModule } from './respuestas-routing.module';
import { RespuestasComponent } from './respuestas.component';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [
    RespuestasComponent
  ],
  imports: [
    CommonModule,
    CountdownModule,
    RespuestasRoutingModule,
  ]
})
export class RespuestasModule { }
