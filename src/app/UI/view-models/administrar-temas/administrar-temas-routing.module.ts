import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarTemasComponent } from './administrar-temas.component';

const routes: Routes = [{ path: '', component: AdministrarTemasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarTemasRoutingModule { }
