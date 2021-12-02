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
  @Input()
  alternativas:any = []
  constructor(
    private service: GetPreguntasUseCases,
  ) { }

  ngOnInit(): void {
  }

}
