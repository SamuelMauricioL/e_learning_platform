import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreguntasGateway } from 'src/app/domain/models/Pregunta/pregunta-gateway';
import { AlternativaPreguntaModel, ElementosPreguntaModel, PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService extends PreguntasGateway {
  
  constructor(
    private firestore: AngularFirestore,
  ) { super(); }

  getAllPreguntas(_idSubTema: string): Observable<PreguntaModel[]> {
    const path: string = `SubTemas/${_idSubTema}`;
    return this.firestore.collection<PreguntaModel>('Preguntas',ref=> ref.where('idSubTema','==',path)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PreguntaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
    
  }

  getAllPreguntasByTema(_idTema: string): Observable<PreguntaModel[]> {
    const path: string = `/Tema/${_idTema}`;
    return this.firestore.collection<PreguntaModel>('Preguntas', ref => ref.where('idTema', '==', path)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PreguntaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  // get All Preguntas And Alternaticas y elementos
  getAllPreguntasAlternativas(_idPregunta: string): any {
    const path: string = `Preguntas/${_idPregunta}/Alternativas`;
    return this.firestore.collection(path).snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as AlternativaPreguntaModel;
          data.id = a.payload.doc.id;
          return data;
      }))
    );

  }

   // get All Preguntas And Alternaticas y elementos
   getAllPreguntasElementos(_idPregunta: string): any {
    const path: string = `Preguntas/${_idPregunta}/Elementos`;
    return this.firestore.collection(path).snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ElementosPreguntaModel;
          data.id = a.payload.doc.id;
          return data;
      }))
    );

  }

  async createPregunta(_model: PreguntaModel,modelAlt:Array<AlternativaPreguntaModel>,modelEle:Array<ElementosPreguntaModel>): Promise<any> {
    const id = this.firestore.createId();
    await this.firestore.collection('Preguntas').doc(id).set(_model);
    //Agregarndo Elementos 
    let batch = this.firestore.firestore.batch();
    
    
    // modelEle.forEach(element => {
    //   const idEle = this.firestore.createId();
    //   let refEle = this.firestore.collection('Preguntas').doc(id).collection("Elementos").doc(idEle).ref;
    //   batch.set(refEle,element);
    // });
    
    // modelAlt.forEach(element => {
    //   const idAlt = this.firestore.createId();
    //   let refEle = this.firestore.collection('Preguntas').doc(id).collection("Alternativas").doc(idAlt).ref;
    //   batch.set(refEle,element);
    // });
    // this.firestore.collection('Preguntas').add(_model)
    return batch.commit();
  }
  updatePregunta(_id: string, _model: PreguntaModel): Promise<any> {
    return this.firestore.collection('Preguntas').doc(_id).update(_model);
  }
  deletePregunta(_id: string): Promise<any> {
    // await this.firestore.collection('Preguntas').doc(_id).collection("Alternativas")  
    return this.firestore.collection('Preguntas').doc(_id).delete();
  }

  getElementos(_id: string): Observable<any[]> {
    return this.firestore.collection<any>('Preguntas').doc(_id).collection("Elementos").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
  getAlternativas(_id: string): Observable<any[]> {
    return this.firestore.collection<any>('Preguntas').doc(_id).collection("Alternativas").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
  getPregunta(_id: string): Observable<any> {
    return this.firestore.collection<any>('Preguntas').doc(_id).valueChanges();
  }
  

}
