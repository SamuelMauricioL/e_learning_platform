import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradoGateway } from 'src/app/domain/models/Grado/grado-gateway';
import { GradoModel } from 'src/app/domain/models/Grado/grado-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GradosService extends GradoGateway {

  constructor(
    private firestore: AngularFirestore,
  ) {super();}

  getAllGrados(): Observable<GradoModel[]> {
    return this.firestore.collection<GradoModel>('Grados').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as GradoModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
}
