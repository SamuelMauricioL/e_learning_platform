import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesModel } from '../models/Roles/roles-model';
import { RolesGateway } from '../models/Roles/roles-gateway';

@Injectable({
  providedIn: 'root'
})

export class GetRolesUseCase {
  constructor( private _gateway: RolesGateway) {}

  getOneRol(_rol:string): Observable<Array<RolesModel>> {
    return this._gateway.getOneRol(_rol);
  }

}