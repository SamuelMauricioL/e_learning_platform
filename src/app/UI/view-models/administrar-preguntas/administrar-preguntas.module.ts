import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarPreguntasRoutingModule } from './administrar-preguntas-routing.module';
import { AdministrarPreguntasComponent } from './administrar-preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministrarPreguntasComponent
  ],
  imports: [
    CommonModule,
    AdministrarPreguntasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministrarPreguntasModule { }
