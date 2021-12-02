import { Component, OnInit } from '@angular/core';
import { CursoModel } from 'src/app/domain/models/Curso/curso-model';
import { GetCursosUseCases } from 'src/app/domain/usecase/get-cursos-use-case';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  constructor(
    private service: GetCursosUseCases,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  idGrado: string = this.route.snapshot.params.id;
  type_user: string = this.route.snapshot.params.typeUser;

  collection = [] as CursoModel[]
  
  ngOnInit(): void {

    this.service.getAllCursos(this.idGrado).subscribe(resp => {
      this.collection = resp;
    },
      error => {
        console.error(error);
      });
  }

  navigate(idGrado: string, idCurso: string, curso_name: string) {
    this.router.navigate(['administrar-temas', idGrado, idCurso, curso_name, this.type_user]);
  }

}
