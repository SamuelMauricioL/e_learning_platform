import {Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { UsuarioModel } from '../models/Usuario/usuario-model';
import { UsuarioGateway } from '../models/Usuario/usuario-gateway';

@Injectable({
  providedIn: 'root'
})

export class GetUserUseCases {
  constructor( private _userGateway: UsuarioGateway) {}

  getAllUsers(): Observable<Array<UsuarioModel>> {
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._userGateway.getAllUsers();
  }

  createUser(model :UsuarioModel): Promise<any> {
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._userGateway.createUser(model);
  }

  updateUser(id:string, model :UsuarioModel): Promise<any> {
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._userGateway.updateUser(id, model);
  }

  deleteUser(id:string): Promise<any> {
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._userGateway.deleteUser(id);
  }

}