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
  ) { this.managerForm = new FormGroup({}); }

  idUsuario: any;

  ruta: string = this.route.snapshot.params.ruta;
  idtema: string = this.route.snapshot.params.idtema;
  tema: string = this.route.snapshot.params.tema;
  idSubTema: string = this.route.snapshot.params.idSubTema;
  nameCurso: string = this.route.snapshot.params.nameCurso;
  act: string = this.route.snapshot.params.act;
  idCurso: string = this.route.snapshot.params.idCurso;
  idIntento: string = this.route.snapshot.params.intento;

  managerForm: FormGroup;
  notas = Array();

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

  // col_resp = new Array();


  ngOnInit(): void {
    if (this.act != undefined) {
      this.service_respuestas.getIntento(this.idIntento).subscribe(response => {
        
        let col_resp = response.subtemas.sort((n1: any ,n2: any) => n1.indice - n2.indice);
        
        for(let i = 0; i < col_resp.length; i++){
          for(let ipre = 0; ipre < col_resp[i].preguntas.length; ipre++){
            this.collection_de_preguntas_completo.push( col_resp[i].preguntas[ipre])
          }
        }
        this.timer();
      },
      (error => { console.error(error); })
    );
      
    }else{
      this.service_preguntas.getAll(this.idSubTema).subscribe(pregunta => {
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
    setTimeout(() => { this.add(); }, 1000);

  }

  evaluar(resp: any) {
    if (resp == true) {
      this.rpta_correcta++;
    } else if (resp == false) {
      this.rpta_incorrecta++;
    }
  }

  guardar(): void {

    console.log("guardar");
    // this.idUsuario = localStorage.getItem('user');
    // let total = this.notas.reduce((a, b) => a + b, 0);
    // let sumatotal = total / this.notas.length;

    // this.managerForm = new FormGroup({
    //   id: new FormControl(this.idtema, Validators.required),
    //   identificador: new FormControl(this.idtema, Validators.required),
    //   idAlumno: new FormControl(JSON.parse(this.idUsuario).id, Validators.required),
    //   idTema: new FormControl(this.idtema, Validators.required),
    //   promedio: new FormControl(sumatotal, Validators.required),
    //   ruta: new FormControl(this.ruta, Validators.required),
    //   tiempo: new FormControl(this.tiempo_transcurrido, Validators.required),
    //   estado: new FormControl(true, Validators.required),
    // });

    // const { id, ...obj } = this.managerForm.value;
    // this.service_respuestas.create(obj).then((_response) => {
    //   this.managerForm.reset();
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  retroceder() {

    if (this.act != undefined) {
      this.router.navigate(['/practicar-temas/' + this.nameCurso + '/' + this.idCurso]);
    } else {
      this.router.navigate(['/responder-preguntas/' + this.idtema + '/' + this.ruta]);
    }
  }

}
