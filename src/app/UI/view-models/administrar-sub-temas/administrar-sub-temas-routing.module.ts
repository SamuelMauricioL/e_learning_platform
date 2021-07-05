import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarSubTemasComponent } from './administrar-sub-temas.component';

const routes: Routes = [{ path: '', component: AdministrarSubTemasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarSubTemasRoutingModule { }
