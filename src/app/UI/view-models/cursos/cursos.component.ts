import { Component, OnInit } from '@angular/core';
import { CursoModel } from 'src/app/domain/models/Curso/curso-model';
import { GetCursosUseCases } from 'src/app/domain/usecase/get-cursos-use-case';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  constructor(
    private service: GetCursosUseCases,
  ) { }

  collection = [] as CursoModel[]
  
  ngOnInit(): void {
    this.service.getAllCursos('asd').subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
      error => {
        console.error(error);
      });
  }

}
