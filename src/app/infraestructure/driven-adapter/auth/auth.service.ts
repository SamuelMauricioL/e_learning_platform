import { first } from 'rxjs/operators';
import { Observable , of} from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioModel } from 'src/app/domain/models/Usuario/usuario-model';
import { map,switchMap } from 'rxjs/operators';
import { RolesModel } from 'src/app/domain/models/Roles/roles-model'; 
// import firebase from 'firebase/app';
// import {User} from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  userIn$: Observable<any> = of(null);
  usuario:any;
  roles:any;
  constructor(private firestore: AngularFirestore,public afAuth: AngularFireAuth) {
    
    // this.userIn$ = this.afAuth.authState.pipe(
    //   map((val:any)=>{
    //     return this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',val.email)).valueChanges()
    //   })
    // );
    
    // this.afAuth.user.subscribe((val:any)=>{
    //   this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',val.email)).valueChanges().subscribe(
    //     (actions:any)=> {
          
    //       const datos = actions[0]as UsuarioModel;
    //       console.log(actions);
    //       this.userIn$ = this.firestore.collection<RolesModel>('Roles',ref=> ref.where('rol','==',datos.rol)).snapshotChanges().pipe(
    //         map(actions => actions.map(a => {
    //           const data = a.payload.doc.data() as RolesModel;
    //           data.id = a.payload.doc.id;
    //           datos.roles = data;
    //           console.log(datos);
    //           return datos;
    //         }))
    //       );
          
    //     }
    //   )
    // })
    
    // this.getRol();
  }
  async Partes(val:any){
    let prueba =  await this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',val.email)).valueChanges().toPromise().then(cal=>{return cal;});
    console.log(prueba);
    return  this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',val.email)).valueChanges()
  }
  async login(email: string, password: string) {
    try {
      
       let varUser = await this.afAuth.signInWithEmailAndPassword(email, password);
       
       return varUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise()
  }
  getRol(){
    let varUss:any;
    this.afAuth.user.subscribe((val:any)=>{
        this.firestore.collection<UsuarioModel>('Usuarios',ref=> ref.where('email','==',val.email)).valueChanges().subscribe(
          (actions:any)=> {
            
            const datos = actions[0]as UsuarioModel;
            console.log(actions);
            this.firestore.collection<RolesModel>('Roles',ref=> ref.where('rol','==',datos.rol)).valueChanges().subscribe(
              a => {
                const data = a[0] as RolesModel;
                datos.roles = data;
                console.log(datos);
                localStorage.setItem('userRoles',JSON.stringify(datos));

              }
            );
            
          }
        )
      })
  }

}
