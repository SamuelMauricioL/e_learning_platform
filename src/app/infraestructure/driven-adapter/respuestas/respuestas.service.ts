import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespuestaGateway } from 'src/app/domain/models/Respuesta/respuesta-gateway';
import { RespuestaModel } from 'src/app/domain/models/Respuesta/respuesta-model';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService extends RespuestaGateway {
  
  constructor(
    private firestore: AngularFirestore,
  ) {super();}
  
  getAllRespuestas(): Observable<RespuestaModel[]> {
    return this.firestore.collection<RespuestaModel>('Respuestas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RespuestaModel;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }
  createRespuesta(_model: RespuestaModel): Promise<any> {
    return this.firestore.collection('Respuestas').add(_model);
  }
  updateRespuesta(_id: string, _model: RespuestaModel): Promise<any> {
    return this.firestore.collection('Respuestas').doc(_id).update(_model);
  }
  deleteRespuesta(_id: string): Promise<any> {
    return this.firestore.collection('Respuestas').doc(_id).delete();
  }

}
