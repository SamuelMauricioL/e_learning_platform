import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradoModel } from 'src/app/domain/models/Grado/grado-model';
import { GetGradosUseCases } from 'src/app/domain/usecase/get-grados-use-case';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(
    private service: GetGradosUseCases,
    public router: Router,
    private route: ActivatedRoute,
    ) { }

    collection = [] as GradoModel[]

  ngOnInit(): void {
    this.service.getAllCursos().subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
      error => {
        console.error(error);
      });
  }

  navigateCursos(idGrado: string) {
    this.router.navigate(['cursos', idGrado, 'Estudiante']);
  }
}
