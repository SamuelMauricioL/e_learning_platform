import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore ,Query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespuestaGateway } from 'src/app/domain/models/Respuesta/respuesta-gateway';
import { IntentoModel, RespuestaModel } from 'src/app/domain/models/Respuesta/respuesta-model';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService extends RespuestaGateway {

  constructor(
    private firestore: AngularFirestore,
  ) { super(); }

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




  async createIntento(_model: IntentoModel): Promise<any> {
    const id = this.firestore.createId();
    await this.firestore.collection('Intentos').doc(id).set(_model);
    return String(id);

  }

  getIntento(_idmodel: any): Observable<any> {

    return this.firestore.collection<any>("Intentos").doc(_idmodel).valueChanges().pipe(
      map(data => {
        data.id = _idmodel
        return data;
      })
    );
  }

  updateIntento(_idmodel: any, _model: any): Promise<any> {
    return this.firestore.collection('Intentos').doc(_idmodel).update(_model)
  }


  getLastDocumentIntento(_idUsuario: any, _idTema: any): Observable<any> {
    const path_idUsuario = "Usuarios/" + _idUsuario;
    const path_idTema = "Temas/" + _idTema;

    return this.firestore.collection<any>('Intentos', ref => ref.
      where("idUsuario", "==", path_idUsuario).
      where("idTema", "==", path_idTema).where("estado", "==","true").orderBy("fechaId", "desc").limit(1)).valueChanges();
  }
  getIntentosByUser(_idUsuario: any): Observable<any> {
    const path_idUsuario = "Usuarios/" + _idUsuario;
    return this.firestore.collection<any>('Intentos', ref => ref.
      where("idUsuario", "==", path_idUsuario).
      where("estado", "==", "true").
      orderBy("fechaId", "asc")).valueChanges();
  }
}
