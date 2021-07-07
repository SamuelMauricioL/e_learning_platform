import { Observable } from 'rxjs';
import { TemaModel } from './tema-model';

export abstract class TemaGateway {
    abstract getAllTemas(_idGrado: string, _idcurso: string): Observable<Array<TemaModel>>;
    abstract createTema(_model :TemaModel) : Promise<any>;
    abstract updateTema(_id:string, _model :TemaModel) : Promise<any>;
    abstract deleteTema(_id:string) : Promise<any>;
}