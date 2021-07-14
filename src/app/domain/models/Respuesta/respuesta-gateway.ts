import { Observable } from 'rxjs';
import { RespuestaModel } from './respuesta-model';

export abstract class RespuestaGateway {
    abstract getAllRespuestas(): Observable<Array<RespuestaModel>>;
    abstract createRespuesta(_model : RespuestaModel) : Promise<any>;
    abstract updateRespuesta(_id:string, _model : RespuestaModel) : Promise<any>;
    abstract deleteRespuesta(_id:string) : Promise<any>;
}