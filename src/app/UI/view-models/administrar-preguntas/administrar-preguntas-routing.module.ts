import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarPreguntasComponent } from './administrar-preguntas.component';

const routes: Routes = [{ path: '', component: AdministrarPreguntasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarPreguntasRoutingModule { 
 
}
