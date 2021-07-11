import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';

@Component({
  selector: 'app-responder-preguntas',
  templateUrl: './responder-preguntas.component.html',
  styleUrls: ['./responder-preguntas.component.scss']
})
export class ResponderPreguntasComponent implements OnInit {

  constructor(
    private service: GetSubTemasUseCases,
    private route: ActivatedRoute,
  ) { }

  idTema: string = this.route.snapshot.params.idTema;
  orden_de_subtemas: string = this.route.snapshot.params.orden;
  list_orden_de_subtemas = this.orden_de_subtemas.split(',') as [];

  collection = [] as SubTemaModel[];

  ngOnInit(): void {
    // LISA DE SUBTEMAS
    this.service.getAll(this.idTema).subscribe(resp => {
      this.collection = resp;
      console.log(this.collection);
      console.log(this.list_orden_de_subtemas);
    },
      error => {
        console.error(error);
      });
  }

}
