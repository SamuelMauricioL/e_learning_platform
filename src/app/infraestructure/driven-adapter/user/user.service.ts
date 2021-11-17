import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioGateway } from 'src/app/domain/models/Usuario/usuario-gateway';
import { UsuarioModel } from 'src/app/domain/models/Usuario/usuario-model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends UsuarioGateway {
  
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
  ) {super();}

  getAllUsers(): Observable<UsuarioModel[]> {
    return this.firestore.collection<UsuarioModel>('Usuarios').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UsuarioModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  createUser(estudiante: UsuarioModel): Promise<any> {
    this.auth.register(estudiante.email, estudiante.contraseña);
    return this.firestore.collection('Usuarios').add(estudiante);
  }

  updateUser(id: any, estudiante: any): Promise<any> {
    return this.firestore.collection('Usuarios').doc(id).update(estudiante);
  }
  
  deleteUser(id: any): Promise<any> {
    return this.firestore.collection('Usuarios').doc(id).delete();
  }
  getUsersByEmail(_email:string): Observable<UsuarioModel[]> {
    return this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',_email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UsuarioModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
}
