import { Observable } from 'rxjs';
import { GradoModel } from './grado-model';

export abstract class GradoGateway {
    abstract getAllGrados(): Observable<Array<GradoModel>>;
}