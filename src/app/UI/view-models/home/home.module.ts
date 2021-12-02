import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GradosComponent } from './componentes/grados/grados.component';
import { ListadoEstudiantesComponent } from './componentes/listado-estudiantes/listado-estudiantes.component';
import { ReporteTiempoComponent } from './componentes/reporte-tiempo/reporte-tiempo.component';
import { ReportePastelComponent } from './componentes/reporte-pastel/reporte-pastel.component';
import { ReporteIntentosComponent } from './componentes/reporte-intentos/reporte-intentos.component';



@NgModule({
  declarations: [
    HomeComponent,
    GradosComponent,
    ListadoEstudiantesComponent,
    ReporteTiempoComponent,
    ReportePastelComponent,
    ReporteIntentosComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
