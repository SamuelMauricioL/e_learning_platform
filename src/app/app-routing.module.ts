import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./UI/view-models/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./UI/view-models/login/login.module').then(m => m.LoginModule) },
  { path: 'administrar-usuarios', loadChildren: () => import('./UI/view-models/administrar-usuarios/administrar-usuarios.module').then(m => m.AdministrarUsuariosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const ArrayOfComponents = [ManagerUsersComponent]