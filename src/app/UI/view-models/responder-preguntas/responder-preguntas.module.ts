import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponderPreguntasRoutingModule } from './responder-preguntas-routing.module';
import { ResponderPreguntasComponent } from './responder-preguntas.component';
import { CountdownModule, CountdownComponent } from 'ngx-countdown';

@NgModule({
  declarations: [
    ResponderPreguntasComponent
  ],
  imports: [
    CommonModule,
    ResponderPreguntasRoutingModule,
    CountdownModule,
    CountdownComponent,
  ]
})
export class ResponderPreguntasModule { }
