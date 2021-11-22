import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarPreguntasRoutingModule } from './administrar-preguntas-routing.module';
import { AdministrarPreguntasComponent } from './administrar-preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AdministrarPreguntasComponent
  ],
  imports: [
    CommonModule,
    AdministrarPreguntasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class AdministrarPreguntasModule { }
