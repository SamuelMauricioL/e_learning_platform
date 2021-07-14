import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-responder-preguntas',
  templateUrl: './responder-preguntas.component.html',
  styleUrls: ['./responder-preguntas.component.scss']
})
export class ResponderPreguntasComponent implements OnInit {
  
  private stepper!: Stepper;
  
  constructor(
    private service: GetSubTemasUseCases,
    private service_preguntas: GetPreguntasUseCases,
    private route: ActivatedRoute,
    public router: Router,

  ) {}
    
  next() {
    this.stepper.next();
  }

  idTema: string = this.route.snapshot.params.idTema;
  subTema: string = this.route.snapshot.params.subTema;
  orden_de_subtemas= this.route.snapshot.params.orden;
  list_orden_de_subtemas = this.orden_de_subtemas.split(',') as [];

  // COLECCIÓN DE SUB_TEMAS
  collection = [] as SubTemaModel[];
  
  // COLECCIÓN DE PREGUNTAS X SUBTEMA
  collection_de_preguntas = [] as PreguntaModel[];
  
  ngOnInit(): void {
    // LISA DE SUBTEMAS
    this.service.getAll(this.idTema).subscribe(resp => {
        this.collection = resp;
        console.log(this.collection);
        console.log(this.list_orden_de_subtemas);
        console.log(this.collection_de_preguntas);
      },
      error => {
        console.error(error);
    });
    
    // this.stepper = new Stepper(document.querySelector('#stepper1')!, {
    //   linear: false,
    //   animation: true
    // })
  }

  listar_preguntas_x_subtema(id_subtema: string) {
    this.service_preguntas.getAll(id_subtema).subscribe(resp => {
      this.collection_de_preguntas = resp;
    },
      error => {
        console.error(error);
      });
  }

  onSubmit() {
    // do something here
    return false;
  }

  navigateCursos(idPregunta: string) {
    this.router.navigate(['dar-respuestas', idPregunta]);
  }
}
