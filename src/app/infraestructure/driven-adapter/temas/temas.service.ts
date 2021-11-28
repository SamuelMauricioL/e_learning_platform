import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemaGateway } from 'src/app/domain/models/Tema/tema-gateway';
import { TemaModel } from 'src/app/domain/models/Tema/tema-model';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TemasService extends TemaGateway {
  
  constructor(
    private firestore: AngularFirestore,
  ) {super();}
 
  getAllTemas(_idGrado: string, _idCurso: string): Observable<TemaModel[]> {
    const path: string = `/Grados/${_idGrado}/Cursos/${_idCurso}`;
    return this.firestore.collection<TemaModel>('Temas', ref => ref.where('curso', '==', path)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TemaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getAllTemasWithGrado(_idGrado: string, _idCurso: string): Observable<TemaModel[]> {
    const path: string = `/${_idGrado}/Cursos/${_idCurso}`;
    return this.firestore.collection<TemaModel>('Temas', ref => ref.where('curso', '==', path)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TemaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  createTema(_model: TemaModel): Promise<any> {
    return this.firestore.collection('Temas').add(_model);
  }
  updateTema(_id: string, _model: TemaModel): Promise<any> {
    return this.firestore.collection('Temas').doc(_id).update(_model);
  }
  deleteTema(_id: string): Promise<any> {
    return this.firestore.collection('Temas').doc(_id).delete();
  }

}
