import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticarComponent } from './practicar.component';

const routes: Routes = [{ path: '', component: PracticarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticarRoutingModule { }
