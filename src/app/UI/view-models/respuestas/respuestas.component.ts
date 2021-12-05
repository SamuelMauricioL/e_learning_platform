import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';


@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})
export class RespuestasComponent implements OnInit {

  public user$: Observable<any> = this.auth.afAuth.idToken;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service_preguntas: GetPreguntasUseCases,
    private service_respuestas: GetRespuestasUseCases,
    private auth: AuthService,
  ) { this.managerForm = new FormGroup({}); this.getIntento() }

  idUsuario: any;

  ruta: string = this.route.snapshot.params.ruta;
  idtema: string = this.route.snapshot.params.idtema;
  tema: string = this.route.snapshot.params.tema;
  idSubTema: string = this.route.snapshot.params.idSubTema;
  nameCurso: string = this.route.snapshot.params.NameCurso;
  act: string = this.route.snapshot.params.act;
  idCurso: string = this.route.snapshot.params.idCurso;
  idIntento: string = this.route.snapshot.params.intento;

  managerForm: FormGroup;
  notafinal: number = 0;

  collection_de_preguntas_completo: any = [];

  rpta_correcta = 0;
  rpta_incorrecta = 0;

  sec = 0;
  min = 0;
  hrs = 0;
  tiempo_transcurrido = '';

  timePassed: any;
  timeLeft: number = 0;

  interval: any;
  alerts: number = 0;

  rpta_modal: number = 0;
  rpta_si_no: number = 0;

  intento_resp: any = [];

  visibility_modal_final: number = 0;
  visibility_modal_btn_final: number = 0;

  ngOnInit(): void { }

  getIntento() {
    if (this.act != undefined) {
      this.service_respuestas.getIntento(this.idIntento).subscribe(response => {

        this.intento_resp = response;
        let col_resp = response.subtemas.sort((n1: any, n2: any) => n1.indice - n2.indice);
        this.collection_de_preguntas_completo = []
        for (let i = 0; i < col_resp.length; i++) {
          for (let ipre = 0; ipre < col_resp[i].preguntas.length; ipre++) {
            this.collection_de_preguntas_completo.push(col_resp[i].preguntas[ipre])
          }
        }
        this.timer();
      },
        (error => { console.error(error); })
      );

    } else {
      this.service_preguntas.getAll(this.idSubTema).subscribe(pregunta => {
        this.collection_de_preguntas_completo = []
        for (let i = 0; i < pregunta.length; i++) {
          this.collection_de_preguntas_completo.push({
            id: pregunta[i].id,
            idSubTema: pregunta[i].idSubTema,
            indice: pregunta[i].indice,
            pregunta: pregunta[i].pregunta,
            descripcion: pregunta[i].descripcion,
            estado: pregunta[i].estado,
            tipoPregunta: pregunta[i].tipoPregunta,
            elementos: pregunta[i].elementos,
            alternativas: pregunta[i].alternativas,

          });
        }
        this.timer();
      },
        (error => { console.error(error); })
      );
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  formateraHMS(time: any) {
    let MS = time % 1000;
    let S = Math.floor(((time - MS) / 1000) % 60);
    let M = Math.floor((S / 60) % 60);
    let H = Math.floor(M / 60);
    return H + ":" + M + ":" + S;
  }

  tick() {
    this.sec++;
    if (this.sec >= 60) {
      this.sec = 0;
      this.min++;
      if (this.min >= 60) {
        this.min = 0;
        this.hrs++;
      }
    }
  }

  add() {
    this.tick();
    this.tiempo_transcurrido = (this.hrs > 9 ? this.hrs : "0" + this.hrs)
      + ":" + (this.min > 9 ? this.min : "0" + this.min)
      + ":" + (this.sec > 9 ? this.sec : "0" + this.sec);
    this.timer();
  }

  timer() {
    this.interval = setTimeout(() => { this.add(); }, 1000);
  }

  evaluar(resp: any) {
    if (resp == true) {
      this.rpta_correcta++;
    } else if (resp == false) {
      this.rpta_incorrecta++;
    }
  }

  finish(intento: any): void {
    this.pauseTimer();
    this.visibility_modal_final = 1;

    let promedio_total = ((20 * this.rpta_correcta) / this.collection_de_preguntas_completo.length)
    this.notafinal = Number(promedio_total.toFixed(0))

    this.intento_resp.correctas = this.rpta_correcta;
    this.intento_resp.estado = "true";
    this.intento_resp.incorrectas = this.rpta_incorrecta;
    this.intento_resp.tiempoTranscurrido = this.tiempo_transcurrido;
    this.intento_resp.termino = String(new Date);
    this.intento_resp.promedio = promedio_total.toFixed(0)

    this.service_respuestas.updateIntento(this.idIntento, this.intento_resp).then((_resp) => {
      this.visibility_modal_btn_final = 1;
    }).catch((error) => {
      console.error(error);
    });
  }

  retroceder() {

    if (this.act != undefined) {
      this.router.navigate(['/practicar-temas/' + this.nameCurso + '/' + this.idCurso]);
    } else {
      this.router.navigate(['/responder-preguntas/' + this.idtema + '/' + this.ruta]);
    }
  }

}
