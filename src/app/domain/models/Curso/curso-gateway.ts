import { Observable } from 'rxjs';
import { CursoModel } from './curso-model';

export abstract class CursoGateway {
    abstract getAllCursos(id: string): Observable<Array<CursoModel>>;
}