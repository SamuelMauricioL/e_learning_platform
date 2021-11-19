import { Observable } from 'rxjs';
import { UsuarioModel } from './usuario-model';

export abstract class UsuarioGateway {
    abstract getAllUsers(): Observable<Array<UsuarioModel>>;
    abstract createUser(_model :UsuarioModel) : Promise<any>;
    abstract updateUser(_id:string, _model :UsuarioModel) : Promise<any>;
    abstract deleteUser(_id:string) : Promise<any>;
    abstract getUsersByEmail(_email:string):Observable<Array<UsuarioModel>>;
    abstract getGeneralUser():Promise<any>;
}