import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import Stepper from 'bs-stepper';
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
  idtema: string = this.route.snapshot.params.idtema;
  ruta: string = this.route.snapshot.params.ruta;

  private stepper!: Stepper;

  constructor(
    private route: ActivatedRoute,
    private service_preguntas: GetPreguntasUseCases,
    private service_respuestas: GetRespuestasUseCases,
    private auth: AuthService
  ) { this.managerForm = new FormGroup({}); }

  managerForm: FormGroup;

  // collection_de_preguntas = [] as PreguntaModel[];
  collection_de_preguntas_completo = Array();
  collection_de_respuestas = Array();
  collection_de_respuestas_leng = 0;
  rpta = 0;
  crct = 0;
  eval = 0;

  notas = Array();

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
      console.log(this.collection_de_preguntas_completo);
      this.startTimer();
    },
      error => {
        console.error(error);
      });

    //@ts-ignore


    //  this.stepper = new Stepper(document.querySelector('#stepper1')!, {
    //   linear: false,
    //   animation: true
    // })
  }

  timePassed: any;
  timeLeft: number = 0;

  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft++;
      this.timePassed = this.formateraHMS(this.timeLeft);
    }, 1000)
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

  onSelect(respuesta: string, correcto: string) {
    console.log(respuesta);
    console.log(correcto);
    // this.rpta = parseInt(respuesta);
    // this.crct = parseInt(correcto);
  }

  evaluar() {
    if (this.rpta == this.crct) {
      this.notas.push(20);
      this.eval = 1;
      console.log("Correcto");

    } else if (this.rpta != this.crct) {
      this.notas.push(0);
      this.eval = 2;
      console.log("inCorrecto");
    }
  }

  finalizar() {

  }

  guardar(): void {
    let total = this.notas.reduce((a, b) => a + b, 0);
    let sumatotal = total / this.notas.length;

    this.managerForm = new FormGroup({
      id: new FormControl('FEZHR6U3jWrlqUrH33mF', Validators.required),
      identificador: new FormControl('FEZHR6U3jWrlqUrH33mF', Validators.required),
      idAlumno: new FormControl('prueba', Validators.required),
      idTema: new FormControl(this.idtema, Validators.required),
      promedio: new FormControl(sumatotal, Validators.required),
      ruta: new FormControl(this.ruta, Validators.required),
      tiempo: new FormControl('00:00:40', Validators.required),
      estado: new FormControl(true, Validators.required),
    });

    const { id, ...obj } = this.managerForm.value;
    this.service_respuestas.create(obj).then((_response) => {
      this.managerForm.reset();
    }).catch((error) => {
      console.error(error);
    });
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    // do something here
    return false;
  }
}
