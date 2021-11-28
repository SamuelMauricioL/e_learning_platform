import { Observable } from 'rxjs';
import { SubTemaModel } from './subtema-model';

export abstract class SubTemaGateway {
    abstract getAllSubTemas(_idTema: string): Observable<Array<SubTemaModel>>;
    abstract createSubTema(_model : SubTemaModel) : Promise<any>;
    abstract updateSubTema(_id:string, _model : SubTemaModel) : Promise<any>;
    abstract deleteSubTema(_id:string) : Promise<any>;
    abstract getOneSubtema(_id:string) : Observable<SubTemaModel>;
    
}