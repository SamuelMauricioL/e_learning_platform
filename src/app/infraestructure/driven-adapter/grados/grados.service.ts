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
  ) {
    super();    
  }

  getAllGrados(): Observable<GradoModel[]> {
    return this.firestore.collection<GradoModel>('Grados').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as GradoModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
  getGradoById(id : string): any {   
    
    const path: string = `Grados/${id}`;
    // return this.firestore.collection<PreguntaModel>('Preguntas', ref => ref.where('idSubTema', '==', path)).snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as PreguntaModel;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   }))
    // );    
    // return this.firestore.collection(path).snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //       const data = a.payload.doc.data() as GradoModel;
    //       data.id = a.payload.doc.id;
    //       return data;
    //   }))
    // );
    return this.firestore.collection('Grados', ref => ref.where('gradoRef', '==', path)) as any;
    

    // return this.firestore.collection<GradoModel>(path).snapshotChanges() as any;

    // return this.firestore.collection('Grados').doc('id').snapshotChanges().subscribe(
    //   res => {
    //     this.item = { id: res.payload.id, ...res.payload.data() as GradoModel[] };
    //   },
    //   err => {
    //     console.debug(err);
    //   }
    // )

    // let document = await this.firestore.doc(path).get().toPromise();
    // return document.data() as GradoModel;
    // return this.firestore.collection('Grado').doc('asdasd').snapshotChanges() as GradoModel;

    // return await this.firestore.doc<GradoModel>('Grados/' + id).get().toPromise();

    // return this.firestore.collection<GradoModel>('Grados').doc(id).snapshotChanges();

    // return this.firestore.doc('Grados/VJ3p01YbfxUCqxTWJmkU');

    // const data = this.firestore.doc('Grados');

    // Observable<GradoModel> data = this.firestore.collection('Grados').doc(id).valueChanges();
    // return data;

    
    // this.tutorials = db.collection('tutorials').snapshotChanges();
    
  }
   
}
