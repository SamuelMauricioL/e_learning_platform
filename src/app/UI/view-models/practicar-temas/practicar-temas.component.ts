import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
import { TemaModel } from 'src/app/domain/models/Tema/tema-model';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';

@Component({
  selector: 'app-practicar-temas',
  templateUrl: './practicar-temas.component.html',
  styleUrls: ['./practicar-temas.component.scss']
})
export class PracticarTemasComponent implements OnInit {

  constructor(
    // private service_preguntas: GetPreguntasUseCases,
    private service: GetTemasUseCases,
    private route: ActivatedRoute,
    private serviceSub: GetSubTemasUseCases,
  ) { }

  nameCurso: string = this.route.snapshot.params.NameCurso;
  idCurso: string = this.route.snapshot.params.idCurso;
  // collection = [] as TemaModel[];
  collectionSub = new Array();

  ngOnInit(): void {

    const datos: any = localStorage.getItem('userRoles');
    let idGrado: any = JSON.parse(datos).gradoId;

    console.log(idGrado)

    this.service.getAllTemasGrado(idGrado, this.idCurso).subscribe(tema => {
      for (let i = 0; i < tema.length; i++) {
        this.serviceSub.getAll(tema[i].id).subscribe(subtema => {
          this.collectionSub.push({subtema});
          // this.collectionSub = subtema;
        },
        error => {
          console.error(error);
        });
      }
      console.log("this.collectionSub")
      console.log(this.collectionSub)
    },
      error => {
        console.error(error);
      });
  }

}
