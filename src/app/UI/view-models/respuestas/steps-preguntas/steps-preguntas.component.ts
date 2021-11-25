import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private el: ElementRef
  ) {}

  isLinear = false;


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

  // public nextfunction (stepper: MatStepper) {
  //   // stepper:MatStepper
  //   // stepper.next();
  //   console.log("stepper")
  //   console.log(stepper)

  // }

}
