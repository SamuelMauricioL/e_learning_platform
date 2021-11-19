import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
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


  isLinear = false;

  constructor(
    private route: ActivatedRoute,
    private service_preguntas: GetPreguntasUseCases,
    private service_respuestas: GetRespuestasUseCases,
    private auth: AuthService,
  ) { this.managerForm = new FormGroup({}); }

  managerForm: FormGroup;

  // collection_de_preguntas = [] as PreguntaModel[];
  collection_de_preguntas_completo = Array();
  collection_de_respuestas = Array();
  collection_de_respuestas_leng = 0;
  rpta = 0;
  crct = 0;
  eval = 0;

  sec = 0;
  min = 0;
  hrs = 0;
  tiempo_transcurrido = '';
  

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
      
      this.timer();
      
    },
      error => {
        console.error(error);
      });
  }

  timePassed: any;
  timeLeft: number = 0;

  interval: any;

  

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

  tick(){
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
    setTimeout(()=>{ this.add(); },1000);

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
