import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticarResolverRoutingModule } from './practicar-resolver-routing.module';
import { PracticarResolverComponent } from './practicar-resolver.component';


@NgModule({
  declarations: [
    PracticarResolverComponent
  ],
  imports: [
    CommonModule,
    PracticarResolverRoutingModule
  ]
})
export class PracticarResolverModule { }
