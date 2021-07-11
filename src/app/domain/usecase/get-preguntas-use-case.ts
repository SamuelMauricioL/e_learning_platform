import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntasGateway } from '../models/Pregunta/pregunta-gateway';
import { PreguntaModel } from '../models/Pregunta/pregunta-model';

@Injectable({
  providedIn: 'root'
})

export class GetPreguntasUseCases {
  constructor( private _gateway: PreguntasGateway) {}

  getAll(_idTema: string): Observable<Array<PreguntaModel>> {
    return this._gateway.getAllPreguntas(_idTema);
  }

  create(model: PreguntaModel): Promise<any> {
    return this._gateway.createPregunta(model);
  }

  update(id:string, model :PreguntaModel): Promise<any> {
    return this._gateway.updatePregunta(id, model);
  }

  delete(_id:string): Promise<any> {
    return this._gateway.deletePregunta(_id);
  }

}