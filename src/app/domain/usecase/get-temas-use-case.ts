import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemaModel } from '../models/Tema/tema-model';
import { TemaGateway } from '../models/Tema/tema-gateway';

@Injectable({
  providedIn: 'root'
})

export class GetTemasUseCases {
  constructor( private _gateway: TemaGateway) {}

  getAllTemas(): Observable<Array<TemaModel>> {
    return this._gateway.getAllTemas();
  }

  createTema(model :TemaModel): Promise<any> {
    return this._gateway.createTema(model);
  }

  updateTema(id:string, model :TemaModel): Promise<any> {
    return this._gateway.updateTema(id, model);
  }

  deleteTema(_id:string): Promise<any> {
    return this._gateway.deleteTema(_id);
  }

}