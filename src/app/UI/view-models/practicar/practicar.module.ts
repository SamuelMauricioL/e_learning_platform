import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticarRoutingModule } from './practicar-routing.module';
import { PracticarComponent } from './practicar.component';


@NgModule({
  declarations: [
    PracticarComponent
  ],
  imports: [
    CommonModule,
    PracticarRoutingModule
  ]
})
export class PracticarModule { }
