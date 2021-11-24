import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
// import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';


@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})
export class RespuestasComponent implements OnInit {

  public user$: Observable<any> = this.auth.afAuth.idToken;
  idPregunta: string = this.route.snapshot.params.idPregunta;

  constructor(
    private route: ActivatedRoute,
    private service_preguntas: GetPreguntasUseCases,
    private auth: AuthService,
  ) { }

  collection_de_preguntas_completo = Array();

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


  ngOnInit(): void {

    this.service_preguntas.getAll(this.idPregunta).subscribe(pregunta => {
      for (let i = 0; i < pregunta.length; i++) {
        this.service_preguntas.getAllAlternative(pregunta[i].id).subscribe((alternativa: any) => {

          this.service_preguntas.getAllElementos(pregunta[i].id).subscribe((elemento: any) => {

            this.collection_de_preguntas_completo.push({
              id: pregunta[i].id,
              idSubTema: pregunta[i].idSubTema,
              indice: pregunta[i].indice,
              pregunta: pregunta[i].pregunta,
              descripcion: pregunta[i].descripcion,
              estado: pregunta[i].estado,
              elementos: elemento,
              alternativas: alternativa,
            });
          });
        });
      }
      this.timer();
    },
      error => {
        console.error(error);
      });
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
    setTimeout(() => { this.add(); }, 1000);

  }

  evaluar(resp: any) {
    if (resp[1] == "si") {
      this.rpta_si_no = 1;
      this.rpta_modal=1;
      this.rpta_correcta++;

    } else if (resp[1] == "no") {
      this.rpta_si_no = 0;
      this.rpta_modal=1;
      this.rpta_incorrecta++;
    }
  }

  cerrarAlert(close: any) {
    this.rpta_modal = 0;
  }

}
