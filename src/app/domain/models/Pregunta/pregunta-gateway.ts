import { Observable } from 'rxjs';
import { AlternativaPreguntaModel, ElementosPreguntaModel, PreguntaModel } from './pregunta-model';

export abstract class PreguntasGateway {
    abstract getAllPreguntas(_idSubTema: string): Observable<Array<PreguntaModel>>;
    abstract getAllPreguntasByTema(_idTema: string): Observable<Array<PreguntaModel>>;
    abstract getAllPreguntasAlternativas(_idPregunta: string): any;
    abstract getAllPreguntasElementos(_idPregunta: string): any;
    abstract createPregunta(_model : PreguntaModel,_modelAlt:Array<AlternativaPreguntaModel>,_modelEle:Array<ElementosPreguntaModel>) : Promise<any>;
    abstract updatePregunta(_id:string, _model : PreguntaModel) : Promise<any>;
    abstract deletePregunta(_id:string) : Promise<any>;
    abstract getElementos(_id:string) : Observable<Array<any>>;
    abstract getAlternativas(_id:string) : Observable<Array<any>>;
    abstract getPregunta(_id:string) : Observable<any>;
}