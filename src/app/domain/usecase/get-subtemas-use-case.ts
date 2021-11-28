import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTemaGateway } from '../models/SubTema/subtema-gateway';
import { SubTemaModel } from '../models/SubTema/subtema-model';

@Injectable({
  providedIn: 'root'
})

export class GetSubTemasUseCases {
  constructor( private _gateway: SubTemaGateway) {}

  getAll(_idTema: string): Observable<Array<SubTemaModel>> {
    return this._gateway.getAllSubTemas(_idTema);
  }

  create(model: SubTemaModel): Promise<any> {
    return this._gateway.createSubTema(model);
  }

  update(id:string, model :SubTemaModel): Promise<any> {
    return this._gateway.updateSubTema(id, model);
  }

  delete(_id:string): Promise<any> {
    return this._gateway.deleteSubTema(_id);
  }
  getOneSubtema(_id:string):Observable<any>{
    return this._gateway.getOneSubtema(_id);
  }

}