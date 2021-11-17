import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolesGateway } from '../../../domain/models/Roles/roles-gateway';
import { RolesModel } from '../../../domain/models/Roles/roles-model';
@Injectable({
  providedIn: 'root'
})
export class RolesService extends RolesGateway{
  

  constructor(private firestore: AngularFirestore,) { super();}

  getOneRol(_rol: string): Observable<RolesModel[]> {
    return this.firestore.collection<RolesModel>('Roles',ref=> ref.where('rol','==',_rol)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RolesModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
}
