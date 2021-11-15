import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticarTemasRoutingModule } from './practicar-temas-routing.module';
import { PracticarTemasComponent } from './practicar-temas.component';


@NgModule({
  declarations: [
    PracticarTemasComponent
  ],
  imports: [
    CommonModule,
    PracticarTemasRoutingModule
  ]
})
export class PracticarTemasModule { }
