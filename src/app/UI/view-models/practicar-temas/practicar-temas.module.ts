import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticarTemasRoutingModule } from './practicar-temas-routing.module';
import { PracticarTemasComponent } from './practicar-temas.component';

import { ChargeCoeheteComponent } from '../../../UI/common/charge-coehete/charge-coehete.component';


@NgModule({
  declarations: [
    PracticarTemasComponent,
    ChargeCoeheteComponent,
  ],
  imports: [
    CommonModule,
    PracticarTemasRoutingModule
  ],
})
export class PracticarTemasModule { }
