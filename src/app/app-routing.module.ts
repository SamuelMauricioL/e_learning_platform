import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './UI/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./UI/view-models/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login/:typeUser',
    loadChildren: () => import('./UI/view-models/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'administrar-usuarios',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/administrar-usuarios/administrar-usuarios.module').then(m => m.AdministrarUsuariosModule)
  },
  {
    path: 'grados-academicos/:typeUser',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/grados-academicos/grados-academicos.module').then(m => m.GradosAcademicosModule)
  },
  {
    path: 'cursos/:id/:typeUser',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    /// ESTO PARA QUE ERA????
    path: 'temas',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/temas/temas.module').then(m => m.TemasModule)
  },
  {
    path: 'administrar-temas/:idGrado/:idCurso/:curso/:typeUser',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/administrar-temas/administrar-temas.module').then(m => m.AdministrarTemasModule)
  },
  {
    path: 'administrar-sub-temas/:idTema/:tema/:typeUser',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/administrar-sub-temas/administrar-sub-temas.module').then(m => m.AdministrarSubTemasModule)
  },
  {
    path: 'inicio',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'administrar-preguntas/:idSubTema/:subtema/:typeUser',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/administrar-preguntas/administrar-preguntas.module').then(m => m.AdministrarPreguntasModule)
  },
  {
    path: 'responder-preguntas/:idTema/:orden',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/responder-preguntas/responder-preguntas.module').then(m => m.ResponderPreguntasModule)
  },
  {
    path: 'dar-respuestas/:idSubTema/:ruta/:idtema/:tema',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/respuestas/respuestas.module').then(m => m.RespuestasModule)
  },
  {
    path: 'practicar',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/practicar/practicar.module').then(m => m.PracticarModule)
  },
  {
    path: 'practicar-temas/:uso/:NameCurso/:idCurso',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/practicar-temas/practicar-temas.module').then(m => m.PracticarTemasModule)
  },
  {
    path: 'resolver/:act/:NameCurso/:idCurso/:intento/:tema',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/respuestas/respuestas.module').then(m => m.RespuestasModule)
  },
  {
    path: 'practicar-resolver',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./UI/view-models/practicar-resolver/practicar-resolver.module').then(m => m.PracticarResolverModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const ArrayOfComponents = [ManagerUsersComponent]