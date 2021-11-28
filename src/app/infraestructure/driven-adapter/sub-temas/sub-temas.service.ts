import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubTemaGateway } from 'src/app/domain/models/SubTema/subtema-gateway';
import { SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';

@Injectable({
  providedIn: 'root'
})
export class SubTemasService extends SubTemaGateway {
  
  
  constructor(
    private firestore: AngularFirestore,
  ) {super();}
  
  getAllSubTemas(_idTema: string): Observable<SubTemaModel[]> {
    const path: string = `/Temas/${_idTema}`;
    return this.firestore.collection<SubTemaModel>('SubTemas', ref => ref.where('idTema', '==', path)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SubTemaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
  
  createSubTema(_model: SubTemaModel): Promise<any> {
    return this.firestore.collection('SubTemas').add(_model);
  }
  updateSubTema(_id: string, _model: SubTemaModel): Promise<any> {
    return this.firestore.collection('SubTemas').doc(_id).update(_model);
  }
  deleteSubTema(_id: string): Promise<any> {
    return this.firestore.collection('SubTemas').doc(_id).delete();
  }
  getOneSubtema(_id: string): Observable<any> {
    return this.firestore.collection('SubTemas').doc(_id).valueChanges();
  }
}
