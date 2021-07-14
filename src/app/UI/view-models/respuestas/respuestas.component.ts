import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';


@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})
export class RespuestasComponent implements OnInit {
  
  idPregunta: string = this.route.snapshot.params.idPregunta;

  constructor(  
    private route: ActivatedRoute,
    private service_preguntas: GetPreguntasUseCases,
    private service_respuestas: GetRespuestasUseCases,
  ) { }


  collection_de_preguntas = [] as PreguntaModel[];
  collection_de_respuestas = Array();
  rpta = 0;
  crct = 0;
  eval = 0 ;

  ngOnInit(): void {
    this.service_preguntas.getAll(this.idPregunta).subscribe(resp => {
      this.collection_de_preguntas = resp;
      
      for( var i of this.collection_de_preguntas){
        this.collection_de_respuestas = i.alternativas.split(',');
      }
      // console.log(this.collection_de_respuestas);
      // console.log(this.collection_de_preguntas);
      // console.log(this.idPregunta);
    },
      error => {
        console.error(error);
      });
  }

  onSelect(respuesta: string, correcto: string){
    this.rpta = parseInt(respuesta);
    this.crct = parseInt(correcto);
  }

  evaluar(){
    console.log(this.rpta);
    console.log(this.crct);

    if( this.rpta == this.crct ){
      this.eval = 1;
      console.log("Correcto");

    }else if(this.rpta != this.crct){
      this.eval = 2;
      console.log("inCorrecto");
    }
  }
}
