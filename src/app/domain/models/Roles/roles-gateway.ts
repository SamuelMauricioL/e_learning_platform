import { Observable } from 'rxjs';
import { RolesModel } from './roles-model';

export abstract class RolesGateway {
    abstract getOneRol(_id:string):Observable<Array<RolesModel>>;
}