import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradosAcademicosComponent } from './grados-academicos.component';

const routes: Routes = [{ path: '', component: GradosAcademicosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradosAcademicosRoutingModule { }
