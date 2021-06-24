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
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._gateway.getAllTemas();
  }

}