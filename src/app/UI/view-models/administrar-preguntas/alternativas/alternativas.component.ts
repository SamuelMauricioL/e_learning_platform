import { Component, Input, OnInit } from '@angular/core';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';

@Component({
  selector: 'app-alternativas',
  templateUrl: './alternativas.component.html',
  styleUrls: ['./alternativas.component.scss']
})
export class AlternativasComponent implements OnInit {

  @Input()
  idPregunta:string="";
  @Input()
  tipoPregunta:string="";

  alternativas:any = []
  constructor(
    private service: GetPreguntasUseCases,
  ) { }

  ngOnInit(): void {
    this.service.getAlternativas(this.idPregunta).subscribe((val:any)=>{
      val.sort((a:any,b:any)=>{
        if(this.tipoPregunta=="alternativa"){
          return a.posicion - b.posicion;
        }else{
          return a.valor - b.valor;
        }
        
      })
      this.alternativas = val
      console.log("alternativa",this.alternativas)
    })
  }

}
