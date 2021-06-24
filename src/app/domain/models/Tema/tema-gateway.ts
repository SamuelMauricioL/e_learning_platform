import { Observable } from 'rxjs';
import { TemaModel } from './tema-model';

export abstract class TemaGateway {
    abstract getAllTemas(): Observable<Array<TemaModel>>;
}