import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoGateway } from 'src/app/domain/models/Curso/curso-gateway';
import { CursoModel } from 'src/app/domain/models/Curso/curso-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CursoGateway {

  constructor(
    private firestore: AngularFirestore,
  ) {super();}

  getAllCursos(idGrado: string): Observable<CursoModel[]> {
    return this.firestore.collection<CursoModel>('Grados').doc('VJ3p01YbfxUCqxTWJmkU').collection('Cursos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursoModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
}
