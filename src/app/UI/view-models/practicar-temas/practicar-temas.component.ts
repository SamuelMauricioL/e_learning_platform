import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';

@Component({
  selector: 'app-practicar-temas',
  templateUrl: './practicar-temas.component.html',
  styleUrls: ['./practicar-temas.component.scss']
})
export class PracticarTemasComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private service: GetTemasUseCases,
    private route: ActivatedRoute,
    private serviceSub: GetSubTemasUseCases,
    private service_preguntas: GetPreguntasUseCases,
    private service_respuestas: GetRespuestasUseCases,

  ) { }

  nameCurso: string = this.route.snapshot.params.NameCurso;
  idCurso: string = this.route.snapshot.params.idCurso;
  collectionSub = new Array();
  collectionDataInsert = new Array();

  ngOnInit(): void {
    this.titleService.setTitle("E-Learning Platform | Practicar Temas");
    const datos: any = localStorage.getItem('userRoles');
    let idGrado: any = JSON.parse(datos).gradoId;

    this.service.getAllTemasGrado(idGrado, this.idCurso).subscribe(tema => {
      this.collectionSub = tema
    },
      error => {
        console.error(error);
      });
  }

  practicar(act: any, idtema: any, subtem: any) {
    let dataInsert: any = {
      idTema: idtema,
      fecha: String(new Date()),
      intencion: act,
      tipoIntento: "recoleccion", // recoleccion - consumo
    }

    this.serviceSub.getAll(idtema).subscribe(subtema => {
      dataInsert.subtemas = subtema
      for (let i = 0; i < subtema.length; i++) {
        this.service_preguntas.getAll(subtema[i].id).subscribe(pregunta => {
          dataInsert.subtemas[i].preguntas = pregunta
          if (i == subtema.length - 1) {
            this.crearIntento(dataInsert, act, idtema, subtem);
          }
        },
          error => {
            console.error(error);
          });
      }
    },
      error => {
        console.error(error);
      });

    // this.crearIntento(dataInsert)
  }
  
  crearIntento(dataInsert: any, act:any, idtema: any, subtem: any) {
    this.service_respuestas.createIntento(dataInsert).then((_response) => {
      this.router.navigate(['/resolver/' + act + '/'+ _response + '/' + subtem]);
    }).catch((error) => {
      console.error(error);
    });
  }
}
