import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioModel } from 'src/app/domain/models/Usuario/usuario-model';
import { map, switchMap } from 'rxjs/operators';
import { RolesModel } from 'src/app/domain/models/Roles/roles-model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

// import firebase from 'firebase/app';
// import {User} from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userIn$: Observable<any> = of(null);
  usuario: any;
  roles: any;
  constructor(private firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth) { }


  async Partes(val: any) {
    let prueba = await this.firestore.collection<UsuarioModel>('Usuarios', ref => ref.where('email', '==', val.email)).valueChanges().toPromise().then(cal => { return cal; });
    return this.firestore.collection<UsuarioModel>('Usuarios', ref => ref.where('email', '==', val.email)).valueChanges()
  }
  async login(email: string, password: string) {
    try {
      let varUser = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log("usuario logueado", varUser);
      return varUser.user;
    } catch (error: any) {
      if (error.code == "auth/wrong-password") {
        this.lanzarErrorLogin("Contraseña");
      } else if (error.code == "auth/user-not-found") {
        this.lanzarErrorLogin("Usuario");
      }

      return null;
    }
  }
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      // await localStorage.removeItem('userRoles');
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise()
  }

  getRol(type_user: any) {
    let type: any;
    this.afAuth.user.subscribe((val: any) => {
      this.firestore.collection<UsuarioModel>('Usuarios', ref => ref.where('email', '==', val.email)).valueChanges().subscribe(
        (actions: any) => {
          type = actions[0].rol;
          if (actions[0].rol == type_user || (actions[0].rol == "Administrador" && type_user == "Docente")) {
            const datos = actions[0] as UsuarioModel;
            this.firestore.collection<RolesModel>('Roles', ref => ref.where('rol', '==', datos.rol)).valueChanges().subscribe(
              a => {
                const data = a[0] as RolesModel;
                datos.roles = data;
                localStorage.setItem('userRoles', JSON.stringify(datos));
              }
            );
            this.router.navigate(['/home']);

          } else {
            this.logout()
            if (type == "Administrador") {
              this.lanzarError("Docente");
            } else {
              this.lanzarError(type);
            }
          }
        }
      )
    })
  }

  lanzarError(type_user: any) {
    Swal.fire({
      title: '<strong>Vista equivocada</strong>',
      icon: 'question',
      html:
        'Tu usuario no corresponde a la vista desde la que intentas ingresar' +
        '<a href="/login/' + type_user + '"> - Ir a mi vista</a> ',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }

  lanzarErrorLogin(errorLogin: any) {
    Swal.fire({
      title: errorLogin + ' incorrecto',
      icon: 'warning',
      html: errorLogin + ' es incorrecto porfavor vuelve a intentarlo',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonAriaLabel: 'Thumbs down'
    })

  }

}
