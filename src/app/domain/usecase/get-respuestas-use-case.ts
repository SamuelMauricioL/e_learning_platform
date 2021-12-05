import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntasGateway } from '../models/Pregunta/pregunta-gateway';
import { PreguntaModel } from '../models/Pregunta/pregunta-model';
import { RespuestaGateway } from '../models/Respuesta/respuesta-gateway';
import { IntentoModel, RespuestaModel } from '../models/Respuesta/respuesta-model';

@Injectable({
  providedIn: 'root'
})

export class GetRespuestasUseCases {
  constructor( private _gateway: RespuestaGateway) {}

  getAll(): Observable<Array<RespuestaModel>> {
    return this._gateway.getAllRespuestas();
  }
  
  create(model: RespuestaModel): Promise<any> {
    return this._gateway.createRespuesta(model);
  }

  update(id:string, model :RespuestaModel): Promise<any> {
    return this._gateway.updateRespuesta(id, model);
  }

  delete(_id:string): Promise<any> {
    return this._gateway.deleteRespuesta(_id);
  }

  createIntento(model: IntentoModel): Promise<any> {
    return this._gateway.createIntento(model);
  }

  getIntento(_idmodel: any): Observable<any>{
    return this._gateway.getIntento(_idmodel);
  }

  updateIntento(_idmodel: any, _model: any): Promise<any>{
    return this._gateway.updateIntento(_idmodel, _model);
  }

  getLastDocumentIntento(_idUsuario: any, _idTema: any): Observable<any>{
    return this._gateway.getLastDocumentIntento(_idUsuario, _idTema);
  }

  getIntentosByUser(_idUsuario: any): Observable<any>{
    return this._gateway.getIntentosByUser(_idUsuario);
  }


}