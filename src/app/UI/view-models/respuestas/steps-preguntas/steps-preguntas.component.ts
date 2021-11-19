import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps-preguntas',
  templateUrl: './steps-preguntas.component.html',
  styleUrls: ['./steps-preguntas.component.scss']
})
export class StepsPreguntasComponent implements OnInit {

  @Input() preguntas!: Array<any>;

  constructor() { }

  ngOnInit() {
    console.log("this.preguntas")
    console.log(this.preguntas)
    // //@ts-ignore
    // this.steppers = new Stepper((document.querySelector('#stepper1')), {
    //   linear: false,
    //   animation: true
    // })
  }

  onSelect(respuesta: string, correcto: string) {
    console.log(respuesta);
    console.log(correcto);
    // this.rpta = parseInt(respuesta);
    // this.crct = parseInt(correcto);
  }
}
