import {Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { UsuarioModel } from '../models/Usuario/usuario-model';
import { UsuarioGateway } from '../models/Usuario/usuario-gateway';
import { AuthService } from 'src/app/infraestructure/driven-adapter/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class GetUserUseCases {
  constructor( private _userGateway: UsuarioGateway,private auth: AuthService) {}

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
  getUsersByEmail(email:string):Observable<Array<UsuarioModel>>{
    return this._userGateway.getUsersByEmail(email)
  }
  getGeneralUser():Promise<any>{
    return this._userGateway.getGeneralUser();
  }
  getUsersGrado(_idGrado:string):Observable<Array<any>>{
    return this._userGateway.getUsersGrado(_idGrado)
  }
}