import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
// import firebase from 'firebase/app';
// import {User} from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(public afAuth: AngularFireAuth) {
    
  }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
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

}
