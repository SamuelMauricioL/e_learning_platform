import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarUsuariosComponent } from './administrar-usuarios.component';

const routes: Routes = [{ path: '', component: AdministrarUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarUsuariosRoutingModule { }
