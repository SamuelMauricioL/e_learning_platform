import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponderPreguntasComponent } from './responder-preguntas.component';

const routes: Routes = [{ path: '', component: ResponderPreguntasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponderPreguntasRoutingModule { }
