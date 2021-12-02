import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { }

  type_user: string = this.route.snapshot.params.typeUser;

  collection = [] as GradoModel[]
  collectionGrado = [] as any
  
  ngOnInit(): void {
    this.service.getAllCursos().subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
    error => {
      console.error(error);
    });
    this.buscarGradoTipoUsuario()
  }

  navigateCursos(idGrado: string, typeUser: string) {
    this.router.navigate(['cursos', idGrado, typeUser]);
  }
  buscarGradoTipoUsuario(){    
    this.service.getGradoById('VJ3p01YbfxUCqxTWJmkU').subscribe((resp : any) => {
      this.collectionGrado = resp;
      
      console.log(this.collectionGrado)
    },
      (error : any) => {
      console.error(error);
    });
  }

}
