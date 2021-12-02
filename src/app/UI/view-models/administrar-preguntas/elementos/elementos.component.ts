import { Component, Input, OnInit } from '@angular/core';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.scss']
})
export class ElementosComponent implements OnInit {
  @Input()
  idPregunta:string ="";

  @Input()
  elementos:any = [];
  
  constructor(
    private service: GetPreguntasUseCases,
  ) { }

  ngOnInit(): void {
    this.getElementos();
  }
  
  getElementos(){
    // this.service.getElementos(this.idPregunta).subscribe((val:any)=>{
    //   // console.log("elementos",val);
    //   val.sort((a:any,b:any)=>{
    //     return a.posicion - b.posicion;
    //   })
    //   this.elementos=val;
    // })
  }

}
