import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./UI/view-models/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./UI/view-models/login/login.module').then(m => m.LoginModule) },
  { path: 'administrar-usuarios', loadChildren: () => import('./UI/view-models/administrar-usuarios/administrar-usuarios.module').then(m => m.AdministrarUsuariosModule) },
  { path: 'grados-academicos', loadChildren: () => import('./UI/view-models/grados-academicos/grados-academicos.module').then(m => m.GradosAcademicosModule) },
  { path: 'cursos/:id', loadChildren: () => import('./UI/view-models/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'temas', loadChildren: () => import('./UI/view-models/temas/temas.module').then(m => m.TemasModule) },
  { path: 'administrar-temas/:idGrado/:idCurso', loadChildren: () => import('./UI/view-models/administrar-temas/administrar-temas.module').then(m => m.AdministrarTemasModule) },
  { path: 'administrar-sub-temas', loadChildren: () => import('./UI/view-models/administrar-sub-temas/administrar-sub-temas.module').then(m => m.AdministrarSubTemasModule) },
  { path: 'inicio', loadChildren: () => import('./UI/view-models/inicio/inicio.module').then(m => m.InicioModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const ArrayOfComponents = [ManagerUsersComponent]