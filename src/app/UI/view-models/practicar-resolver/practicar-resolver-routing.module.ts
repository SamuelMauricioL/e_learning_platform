import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticarResolverComponent } from './practicar-resolver.component';

const routes: Routes = [{ path: '', component: PracticarResolverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticarResolverRoutingModule { }
