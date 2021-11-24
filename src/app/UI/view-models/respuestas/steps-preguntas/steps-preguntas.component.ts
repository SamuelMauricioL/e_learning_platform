import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-steps-preguntas',
  templateUrl: './steps-preguntas.component.html',
  styleUrls: ['./steps-preguntas.component.scss']
})
export class StepsPreguntasComponent implements OnInit {

  @Input() preguntas!: Array<any>;
  @Output() correct = new EventEmitter<[number, string]>();

  constructor(
    private route: ActivatedRoute,
    private service_respuestas: GetRespuestasUseCases,
    private el: ElementRef
  ) { this.managerForm = new FormGroup({}); }

  isLinear = false;

  ruta: string = this.route.snapshot.params.ruta;
  idtema: string = this.route.snapshot.params.idtema;
  managerForm: FormGroup;
  notas = Array();


  ngOnInit() {
  }

  onSelect(idelement: string, respuesta: string) {
    let myTag = this.el.nativeElement.querySelector(`.${idelement}`);
    if(respuesta == "si"){
      this.correct.emit([1, respuesta]);
      myTag.classList.add('correct');
    }else{
      myTag.classList.add('incorrect');
      this.correct.emit([1, respuesta]);
    }
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

  public nextfunction (stepper: MatStepper) {
    // stepper:MatStepper
    // stepper.next();
    console.log("stepper")
    console.log(stepper)

  }


}
