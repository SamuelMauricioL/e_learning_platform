import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-steps-preguntas',
  templateUrl: './steps-preguntas.component.html',
  styleUrls: ['./steps-preguntas.component.scss']
})
export class StepsPreguntasComponent implements OnInit {

  @Input() preguntas: Array<any> = [];
  @Output() correct = new EventEmitter<boolean>();

  rpta!: number;
  rpta_si_no!: number;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef
  ) { }

  isLinear = false;

  collection_preguntas_completo = Array();

  valor: any;
  resp: any;

  ngOnInit() {
  }


  comprobar(index: any) {
    let vla = this.preguntas[index]
    if (vla.tipoPregunta == "llenar") {
      let ab: any = [];
      vla.elementos.forEach((element_a: any) => {
        let s = element_a.valor.filter((val: any) => val.tipo == 'input')
        console.log("s")
        console.log(s)
        ab = ab.concat(s)
      });

      let as: any = [];
      ab.forEach((element: any) => {
        if (element.valor == element.rpta) {
          as.push(true)
        } else {
          as.push(false)
        }
      });

      let b = as.find((element: any) => element == false)

      if (b == false) {
        this.preguntas[index].estadoPregunta = false
      } else {
        this.preguntas[index].estadoPregunta = true
      }

      this.preguntas[index].estadoPregunta == false ? (this.rpta = 1, this.rpta_si_no = 0, this.correct.emit(false) ): (this.rpta = 1, this.rpta_si_no = 1, this.correct.emit(true))

    }else{
      if(vla.tipoPregunta =="alternativa"){
        let arrEstado:any = [];
        vla.alternativas.forEach((alternativa:any)=>{
          if(alternativa.correcta == alternativa.rpta){
            arrEstado.push(true)
          }else{
            arrEstado.push(false)
          }
        })
        let fallasEncontradas = arrEstado.find((val:any)=>val==false);
        if(fallasEncontradas==false){
        this.preguntas[index].estadoPregunta = false;
        }else{
        this.preguntas[index].estadoPregunta = true;
        }
      }
    }

  }

  onSelect(idelement: any, respuesta: any) {
    respuesta.rpta = idelement.target.value;
  }

  onSelectOption(respuesta: any){
    let aopt = respuesta.target.parentNode
    let bopt = aopt.classList.contains('correct')
    bopt ? aopt.classList.remove('correct') : aopt.classList.add('correct')

    console.log(aopt) 


      // let myTag = this.el.nativeElement.querySelector(`.rpta${idelement}`);
    // if (respuesta == "si") {
    //   this.correct.emit([1, respuesta]);
    //   myTag.classList.add('correct');
    // } else {
    //   myTag.classList.add('incorrect');
    //   this.correct.emit([1, respuesta]);
    // }
  }

  nextfunction(stepper: MatStepper) {
    stepper: MatStepper
    this.rpta = 0;
    stepper.next();
  }

}
