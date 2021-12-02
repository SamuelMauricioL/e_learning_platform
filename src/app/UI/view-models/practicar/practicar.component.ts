import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoModel } from 'src/app/domain/models/Curso/curso-model';
import { GetCursosUseCases } from 'src/app/domain/usecase/get-cursos-use-case';

@Component({
  selector: 'app-practicar',
  templateUrl: './practicar.component.html',
  styleUrls: ['./practicar.component.scss']
})
export class PracticarComponent implements OnInit {

  constructor(
    public router: Router,
    private service: GetCursosUseCases,
  ) { }

  collection = [] as CursoModel[]

  ngOnInit(): void {
    const datos:any  = localStorage.getItem('userRoles');
    let jsdatos:any = JSON.parse(datos).gradoId;

    this.service.getAllCursosEstudent(jsdatos).subscribe(resp => {
      this.collection = resp;
    },
      error => {
        console.error(error);
      });
  }

  vertemas(idCurso: any, nameCurso: any){
    this.router.navigate(['practicar-temas', nameCurso, idCurso]);

  }

  vertemasAlgoritmo(idCurso: any, nameCurso: any){
    this.router.navigate(['practicar-temas', nameCurso, idCurso]);
  }

}
