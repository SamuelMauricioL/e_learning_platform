import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradoModel } from '../models/Grado/grado-model';
import { GradoGateway } from '../models/Grado/grado-gateway';

@Injectable({
  providedIn: 'root'
})

export class GetGradosUseCases {
  constructor( private _gateway: GradoGateway) {}

  getAllCursos(): Observable<Array<GradoModel>> {
    //TODO: En este sitio podríamos manejar las configuraciones y hace un control de excepciones
    return this._gateway.getAllGrados();
  }

}