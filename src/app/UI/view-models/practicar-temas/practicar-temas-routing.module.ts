import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticarTemasComponent } from './practicar-temas.component';

const routes: Routes = [{ path: '', component: PracticarTemasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticarTemasRoutingModule { }
