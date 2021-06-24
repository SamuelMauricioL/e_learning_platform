import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemaGateway } from 'src/app/domain/models/Tema/tema-gateway';
import { TemaModel } from 'src/app/domain/models/Tema/tema-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService extends TemaGateway {

  constructor(
    private firestore: AngularFirestore,
  ) {super();}

  getAllTemas(): Observable<TemaModel[]> {
    return this.firestore.collection<TemaModel>('Temas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TemaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
}
