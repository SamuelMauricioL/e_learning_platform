import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/Curso/curso-model';
import { CursoGateway } from '../models/Curso/curso-gateway';

@Injectable({
  providedIn: 'root'
})

export class GetCursosUseCases {
  constructor( private _gateway: CursoGateway) {}

  getAllCursos(id: string): Observable<Array<CursoModel>> {
    return this._gateway.getAllCursos(id);
  }

  getAllCursosEstudent(idGrado: string): Observable<Array<CursoModel>> {
    return this._gateway.getAllCursosEstudent(idGrado);
  }

}