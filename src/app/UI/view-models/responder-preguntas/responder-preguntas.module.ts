import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponderPreguntasRoutingModule } from './responder-preguntas-routing.module';
import { ResponderPreguntasComponent } from './responder-preguntas.component';


@NgModule({
  declarations: [
    ResponderPreguntasComponent
  ],
  imports: [
    CommonModule,
    ResponderPreguntasRoutingModule
  ]
})
export class ResponderPreguntasModule { }
