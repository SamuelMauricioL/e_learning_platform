import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { AlbumCardComponent } from './UI/view-models/album-card/album-card.component';
import { CircularProgressIndicatorComponent } from './UI/common/circular-progress-indicator/circular-progress-indicator.component';
import { AlbumGateway } from './domain/models/Album/album-gateway';
import { AlbumApiService } from './infraestructure/driven-adapter/album-api/album-api.service';
import { AlbumApiServiceWithoutDelay } from './infraestructure/driven-adapter/album-api/album-api-withou-delay.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NavbarComponent } from './UI/common/navbar/navbar.component';
import { UsuarioGateway } from './domain/models/Usuario/usuario-gateway';
import { UserService } from './infraestructure/driven-adapter/user/user.service';
import { GradoGateway } from './domain/models/Grado/grado-gateway';
import { GradosService } from './infraestructure/driven-adapter/grados/grados.service';
import { CursoGateway } from './domain/models/Curso/curso-gateway';
import { CursoService } from './infraestructure/driven-adapter/curso/curso.service';
import { TemaGateway } from './domain/models/Tema/tema-gateway';
import { TemasService } from './infraestructure/driven-adapter/temas/temas.service';
import { SubTemaGateway } from './domain/models/SubTema/subtema-gateway';
import { SubTemasService } from './infraestructure/driven-adapter/sub-temas/sub-temas.service';
import { PreguntasGateway } from './domain/models/Pregunta/pregunta-gateway';
import { PreguntasService } from './infraestructure/driven-adapter/preguntas/preguntas.service';
import { CountdownModule } from 'ngx-countdown';
import { RespuestaGateway } from './domain/models/Respuesta/respuesta-gateway';
import { RespuestasService } from './infraestructure/driven-adapter/respuestas/respuestas.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumCardComponent,
    CircularProgressIndicatorComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CountdownModule,
  ],
  providers: [
    // {
    //   provide: AlbumGateway, 
    //   useClass: AlbumApiService
    // },
    {
      provide: UsuarioGateway,
      useClass: UserService,
    },
    {
      provide: GradoGateway,
      useClass: GradosService,
    },
    {
      provide: CursoGateway,
      useClass: CursoService,
    },
    {
      provide: TemaGateway,
      useClass: TemasService,
    },
    {
      provide: SubTemaGateway,
      useClass: SubTemasService,
    },
    {
      provide: PreguntasGateway,
      useClass: PreguntasService,
    },
    {
      provide: RespuestaGateway,
      useClass: RespuestasService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
