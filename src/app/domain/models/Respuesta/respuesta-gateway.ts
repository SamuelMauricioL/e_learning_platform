import { Observable } from 'rxjs';
import { IntentoModel, RespuestaModel } from './respuesta-model';

export abstract class RespuestaGateway {
    abstract getAllRespuestas(): Observable<Array<RespuestaModel>>;
    abstract createRespuesta(_model : RespuestaModel) : Promise<any>;
    abstract updateRespuesta(_id:string, _model : RespuestaModel) : Promise<any>;
    abstract deleteRespuesta(_id:string) : Promise<any>;

    abstract createIntento(_model : IntentoModel) : Promise<any>;
    abstract getIntento(_idmodel : any) : Observable<any>;
    abstract updateIntento(_idmodel : any, _model: any) : Promise<any>;
    abstract getLastDocumentIntento(_idUsuario : any, _idTema: any) : Observable<any>;
    abstract getIntentosByUser(_idUsuario : any) : Observable<any>;

}