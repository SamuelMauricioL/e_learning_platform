import { Component, OnInit } from '@angular/core';
import { TemaModel } from 'src/app/domain/models/Tema/tema-model';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  constructor(
    private service: GetTemasUseCases,
  ) { }

  collection = [] as TemaModel[]
  
  ngOnInit(): void {
    this.service.getAllTemas().subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
      error => {
        console.error(error);
      });
  }

}
