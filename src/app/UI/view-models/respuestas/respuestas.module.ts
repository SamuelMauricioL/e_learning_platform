import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespuestasRoutingModule } from './respuestas-routing.module';
import { RespuestasComponent } from './respuestas.component';
import { CountdownModule } from 'ngx-countdown';
import { StepsPreguntasComponent } from './steps-preguntas/steps-preguntas.component';

import { MatStepperModule } from '@angular/material/stepper';
import { RptaComponent } from './rpta/rpta.component';


@NgModule({
  declarations: [
    RespuestasComponent,
    StepsPreguntasComponent,
    RptaComponent
  ],
  imports: [
    CommonModule,
    CountdownModule,
    RespuestasRoutingModule,
    MatStepperModule
  ]
})
export class RespuestasModule { }
