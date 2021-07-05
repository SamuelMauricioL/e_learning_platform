import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradoModel } from 'src/app/domain/models/Grado/grado-model';
import { GetGradosUseCases } from 'src/app/domain/usecase/get-grados-use-case';

@Component({
  selector: 'app-grados-academicos',
  templateUrl: './grados-academicos.component.html',
  styleUrls: ['./grados-academicos.component.scss']
})
export class GradosAcademicosComponent implements OnInit {

  constructor(
    private service: GetGradosUseCases,
    public router: Router,
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

  navigateCursos() {
    this.router.navigate(['cursos']);
  }

}
