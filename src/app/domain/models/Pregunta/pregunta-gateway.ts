import { Observable } from 'rxjs';
import { PreguntaModel } from './pregunta-model';

export abstract class PreguntasGateway {
    abstract getAllPreguntas(_idSubTema: string): Observable<Array<PreguntaModel>>;
    abstract createPregunta(_model : PreguntaModel) : Promise<any>;
    abstract updatePregunta(_id:string, _model : PreguntaModel) : Promise<any>;
    abstract deletePregunta(_id:string) : Promise<any>;
}