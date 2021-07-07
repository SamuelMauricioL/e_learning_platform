import { Component, OnInit } from '@angular/core';
import { CursoModel } from 'src/app/domain/models/Curso/curso-model';
import { GetCursosUseCases } from 'src/app/domain/usecase/get-cursos-use-case';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  constructor(
    private service: GetCursosUseCases,
    private route: ActivatedRoute,
  ) { }

  idGrado: string = this.route.snapshot.params.id;
  collection = [] as CursoModel[]
  
  ngOnInit(): void {

    this.service.getAllCursos(this.idGrado).subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
      error => {
        console.error(error);
      });
  }

}
