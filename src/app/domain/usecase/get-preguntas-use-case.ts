import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntasGateway } from '../models/Pregunta/pregunta-gateway';
import { AlternativaPreguntaModel, ElementosPreguntaModel, PreguntaModel } from '../models/Pregunta/pregunta-model';

@Injectable({
  providedIn: 'root'
})

export class GetPreguntasUseCases {
  constructor( private _gateway: PreguntasGateway) {}

  getAll(_idTema: string): Observable<Array<PreguntaModel>> {
    return this._gateway.getAllPreguntas(_idTema);
  }

  getAllAlternative(_idPregunta: string):any {
    return this._gateway.getAllPreguntasAlternativas(_idPregunta);
  }

  getAllElementos(_idPregunta: string):any {
    return this._gateway.getAllPreguntasElementos(_idPregunta);
  }
  
  create(model: PreguntaModel,modelAlt:Array<AlternativaPreguntaModel>,modelEle:Array<ElementosPreguntaModel>): Promise<any> {
    return this._gateway.createPregunta(model,modelAlt,modelEle);
  }

  update(id:string, model :PreguntaModel): Promise<any> {
    return this._gateway.updatePregunta(id, model);
  }

  delete(_id:string): Promise<any> {
    return this._gateway.deletePregunta(_id);
  }
  getElementos(_id:string): Observable<any[]>{
    return this._gateway.getElementos(_id);
  }
  getAlternativas(_id:string): Observable<any[]>{
    return this._gateway.getAlternativas(_id);
  }
  getPregunta(_id: string): Observable<any> {
    return this._gateway.getPregunta(_id);
  }

}