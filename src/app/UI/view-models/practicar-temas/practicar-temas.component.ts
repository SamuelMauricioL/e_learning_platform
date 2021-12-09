import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    private http: HttpClient,
  ) {
    this.idUsuario = JSON.parse(String(localStorage.getItem('user'))).id;
  }

  nameCurso: string = this.route.snapshot.params.NameCurso;
  idCurso: string = this.route.snapshot.params.idCurso;
  uso: string = this.route.snapshot.params.uso;
  collectionSub = new Array();
  collectionDataInsert = new Array();
  idUsuario: string;

  visibilidad: number = 0;

  ngOnInit(): void {
    this.titleService.setTitle("E-Learning Platform | Practicar Temas");
    const datos: any = localStorage.getItem('userRoles');
    let idGrado: any = JSON.parse(datos).grados[0].id;


    this.service.getAllTemasGrado(idGrado, this.idCurso).subscribe(tema => {
      this.collectionSub = tema
      console.log(tema)
      for (let i = 0; i < tema.length; i++) {
        tema[i].promedio = 0;
        this.service_respuestas.getLastDocumentIntento(this.idUsuario, tema[i].id).subscribe((_res: any) => {
          if (_res.length > 0) {
            tema[i].promedio = _res[0].promedio;
          }

          if (i == tema.length - 1) {
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
      idUsuario: 'Usuarios/' + this.idUsuario,
      idTema: idtema,
      fecha: String(new Date()),
      fechaId: String(new Date().getTime()),
      intencion: act,
      tipoIntento: "recoleccion", // recoleccion - consumo
      estado: "false", // true - false

      ruta: [0, 1, 2, 3, 4],
    }

    this.serviceSub.getAll(idtema).subscribe(subtema => {

      dataInsert.subtemas = subtema.sort((a: any, b: any) => Math.random() - 0.5)
      console.log("subtemas", dataInsert.subtemas)
      dataInsert.ruta = []
      // armado de ruta default 
      if (this.uso == "solo") {
        dataInsert.tipoIntento = "recoleccion";
        console.log("entró a solo")
        dataInsert.ruta = this.ordenAleatorioSubtemas(subtema);
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
      } else {
        dataInsert.tipoIntento = "entrenamiento";
        if (subtema.length > 0) {
          
          this.getDatosApi(idtema,act).subscribe((val: any) => {
            if(act=="aprender"){
              dataInsert.ruta = val.aprender_efficient_route;
            }else{
              dataInsert.ruta = val.reforzar_efficient_route;
            }
            
            // empieza a obtener las preguntas 
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

          })
        } else {
          dataInsert.ruta = this.ordenAleatorioSubtemas(subtema);
          //empieza a obtener preguntas 
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
        }
      }

      console.log("nueava ruta", dataInsert.ruta);


    },
      error => {
        console.error(error);
      });

    // this.crearIntento(dataInsert)
  }

  crearIntento(dataInsert: any, act: any, idtema: any, subtem: any) {
    console.log("data traida",dataInsert)
    this.service_respuestas.createIntento(dataInsert).then((_response) => {
      console.log("respuesta creacion",_response);
      /// resolver/:act/:NameCurso/:idCurso/:intento/:tema
      this.router.navigate(['/resolver/' + this.uso + '/' + act + '/' + this.nameCurso + '/' + this.idCurso + '/' + _response + '/' + subtem]);
    }).catch((error) => {
      console.error(error);
    });
  }

  salir() {
    this.router.navigate(['/practicar']);

  }

  getDatosApi(idtema:string,intencion:string): Observable<any> {
    let config = "http://34.231.76.207:8080/ruta-optima";
    const ret = this.http.post<any>(config, { tema_id: idtema, intencion: intencion });
    return ret;
  }
  ordenAleatorioSubtemas(subtema: any) {
    let ruta: any = []
    subtema.forEach((element: any) => {
      if (element.posicionRuta == "inicial") {
        ruta.push(element.indice)
      }
    });
    subtema.forEach((element: any) => {
      if (element.posicionRuta == "aleatorio") {
        ruta.push(element.indice)
      }
    });
    subtema.forEach((element: any) => {
      if (element.posicionRuta == "final") {
        ruta.push(element.indice)
      }
    });
    return ruta;
  }
}
