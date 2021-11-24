import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepsPreguntasComponent } from '../steps-preguntas/steps-preguntas.component';

@Component({
  providers: [StepsPreguntasComponent],
  selector: 'app-rpta',
  templateUrl: './rpta.component.html',
  styleUrls: ['./rpta.component.scss']
})
export class RptaComponent implements OnInit {

  @ViewChild('stepper') private myStepper!: MatStepper;

  @Input() rpta!: number;
  @Input() rpta_si_no!: number;
  @Output() close = new EventEmitter<number>();

  constructor( private stepnext: StepsPreguntasComponent ) { }

  ngOnInit(): void {
  }
  
  cerrar(){
    this.close.emit(this.rpta);
  }

  next() {
    this.close.emit(this.rpta);
    // console.log(this.myStepper);
    // this.stepnext.nextfunction();
    // stepper.next();

  }

}
