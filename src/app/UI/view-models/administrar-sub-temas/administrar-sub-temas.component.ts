import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';

@Component({
  selector: 'app-administrar-sub-temas',
  templateUrl: './administrar-sub-temas.component.html',
  styleUrls: ['./administrar-sub-temas.component.scss']
})
export class AdministrarSubTemasComponent implements OnInit {

  constructor(
    private service: GetSubTemasUseCases,
    private route: ActivatedRoute,
  ) { 
    this.managerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      tema: new FormControl('', Validators.required),
    })
  }

  idTema: string = this.route.snapshot.params.idTema;

  collection = [] as SubTemaModel[];
  actualizar: boolean = false;
  managerForm: FormGroup;

  ngOnInit(): void {
    console.log(this.idTema);
    this.service.getAll(this.idTema).subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
    },
      error => {
        console.error(error);
      });
  }

}
