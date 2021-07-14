import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./UI/view-models/home/home.module').then(m => m.HomeModule) },
  { path: 'login/:typeUser', loadChildren: () => import('./UI/view-models/login/login.module').then(m => m.LoginModule) },
  { path: 'administrar-usuarios', loadChildren: () => import('./UI/view-models/administrar-usuarios/administrar-usuarios.module').then(m => m.AdministrarUsuariosModule) },
  { path: 'grados-academicos/:typeUser', loadChildren: () => import('./UI/view-models/grados-academicos/grados-academicos.module').then(m => m.GradosAcademicosModule) },
  { path: 'cursos/:id/:typeUser', loadChildren: () => import('./UI/view-models/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'temas', loadChildren: () => import('./UI/view-models/temas/temas.module').then(m => m.TemasModule) },
  { path: 'administrar-temas/:idGrado/:idCurso/:curso/:typeUser', loadChildren: () => import('./UI/view-models/administrar-temas/administrar-temas.module').then(m => m.AdministrarTemasModule) },
  { path: 'administrar-sub-temas/:idTema/:tema/:typeUser', loadChildren: () => import('./UI/view-models/administrar-sub-temas/administrar-sub-temas.module').then(m => m.AdministrarSubTemasModule) },
  { path: 'inicio', loadChildren: () => import('./UI/view-models/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'administrar-preguntas/:idSubTema/:subtema/:typeUser', loadChildren: () => import('./UI/view-models/administrar-preguntas/administrar-preguntas.module').then(m => m.AdministrarPreguntasModule) },
  { path: 'responder-preguntas/:idTema/:orden', loadChildren: () => import('./UI/view-models/responder-preguntas/responder-preguntas.module').then(m => m.ResponderPreguntasModule) },
  { path: 'dar-respuestas/:idPregunta', loadChildren: () => import('./UI/view-models/respuestas/respuestas.module').then(m => m.RespuestasModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const ArrayOfComponents = [ManagerUsersComponent]