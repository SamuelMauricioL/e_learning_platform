import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarPreguntasRoutingModule } from './administrar-preguntas-routing.module';
import { AdministrarPreguntasComponent } from './administrar-preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SortablejsModule } from 'ngx-sortablejs';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ElementosComponent } from './elementos/elementos.component';
import { AlternativasComponent } from './alternativas/alternativas.component';
import { EditarComponent } from './editar/editar.component';
@NgModule({
  declarations: [
    AdministrarPreguntasComponent,
    ElementosComponent,
    AlternativasComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    AdministrarPreguntasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SortablejsModule,
    AngularFireStorageModule,
  ]
})
export class AdministrarPreguntasModule { }
