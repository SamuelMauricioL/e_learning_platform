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

  ) { 
    this.idUsuario =  JSON.parse(String(localStorage.getItem('user'))).id ;
  }

  nameCurso: string = this.route.snapshot.params.NameCurso;
  idCurso: string = this.route.snapshot.params.idCurso;
  uso: string = this.route.snapshot.params.uso;
  collectionSub = new Array();
  collectionDataInsert = new Array();
  idUsuario : string;

  visibilidad: number = 0;

  ngOnInit(): void {
    this.titleService.setTitle("E-Learning Platform | Practicar Temas");
    const datos: any = localStorage.getItem('userRoles');
    let idGrado: any = JSON.parse(datos).gradoId;

    
    this.service.getAllTemasGrado(idGrado, this.idCurso).subscribe(tema => {
      this.collectionSub = tema
      console.log(tema)
      for(let i = 0; i < tema.length; i++){
        tema[i].promedio = 0;
        this.service_respuestas.getLastDocumentIntento(this.idUsuario, tema[i].id).subscribe((_res:any)=>{
          if(_res.length > 0){
            tema[i].promedio = _res[0].promedio;
          }

          if(i== tema.length - 1){
            this.collectionDataInsert = tema;
          }

        })
      }
    },
      error => {
        console.error(error);
      });
  }

  practicar(act: any, idtema: any, subtem: any) {
    this.visibilidad = 1;

    let dataInsert: any = {
      idUsuario : 'Usuarios/'+this.idUsuario,
      idTema: 'Temas/' + idtema,
      fecha: String(new Date()),
      fechaId: String(new Date().getTime()),
      intencion: act,
      tipoIntento: "recoleccion", // recoleccion - consumo
      estado: "false", // true - false
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
      /// resolver/:act/:NameCurso/:idCurso/:intento/:tema
      this.router.navigate(['/resolver/' + act+ '/'+ this.nameCurso + '/'+this.idCurso + '/'+ _response + '/' + subtem]);
    }).catch((error) => {
      console.error(error);
    });
  }

  salir(){
    this.router.navigate(['/practicar']);

  }
}
