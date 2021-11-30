import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';

@Component({
  selector: 'app-practicar-temas',
  templateUrl: './practicar-temas.component.html',
  styleUrls: ['./practicar-temas.component.scss']
})
export class PracticarTemasComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private service: GetTemasUseCases,
    private route: ActivatedRoute,
    private serviceSub: GetSubTemasUseCases,
  ) { }

  nameCurso: string = this.route.snapshot.params.NameCurso;
  idCurso: string = this.route.snapshot.params.idCurso;
  // collection = [] as TemaModel[];
  collectionSub = new Array();

  ngOnInit(): void {
    this.titleService.setTitle("E-Learning Platform | Practicar Temas");
    const datos: any = localStorage.getItem('userRoles');
    let idGrado: any = JSON.parse(datos).gradoId;

    this.service.getAllTemasGrado(idGrado, this.idCurso).subscribe(tema => {
      for (let i = 0; i < tema.length; i++) {
        this.serviceSub.getAll(tema[i].id).subscribe(subtema => {
          for (let isub = 0; isub < subtema.length; isub++) {
            // console.log("subtema")
            // console.log(subtema)
            this.collectionSub.push(
              {
                descripcion: subtema[isub].descripcion,
                dificultad: subtema[isub].dificultad,
                estado: subtema[isub].estado,
                id: subtema[isub].id,
                idTema: subtema[isub].idTema,
                indice: subtema[isub].indice,
                subtema: subtema[isub].subtema,
                time: subtema[isub].time,
              }
            );
          }
          // this.collectionSub = subtema;
        },
          error => {
            console.error(error);
          });
      }
    },
      error => {
        console.error(error);
      });
  }

  practicar(act: any, idsub:any, subtem: any) {
    this.router.navigate(['/resolver/' + act + '/'+ this.idCurso + '/'+ this.nameCurso + '/' + idsub + '/' + subtem]);
  }

}
