import { Injectable } from '@angular/core';
// ejecutar npm install firebase
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import {getAuth, Auth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private router: Router) { }

  error = environment.AUTH_ERROR_CODES;

  app = initializeApp(environment.FIREBASE_CONFIG);
  auth = getAuth();
  db = getFirestore(this.app);

  provider = new FacebookAuthProvider();

  isLogged(): boolean{
    return localStorage.getItem('accessToken') ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.removeItem('accessToken');
      this.router.navigate(['/tabs/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }


  // console.log("Proveedor de la credencial:", user.providerId);
  // console.log("Meta data:", user.metadata);
  // console.log("Token:", user.getIdTokenResult()); //puede recibir "true" para refrezcar el token
  // console.log(user.toJSON());

  async createEmail(username : string, password : string): Promise<any>{
    let result;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, username, password);

      const {user} = userCredential;

      result = {
        ret: true, 
        data: user
      }
      return result;
      
    } catch (error : any) {
      
      if(error.code in this.error){
        result = {ret: false, data: this.error[error.code as keyof typeof this.error]}
      } else {
        result = {ret: false, data: 'Debe completar ambos campos'}
      }
      return result;
    }
  }

  async loginEmail(username : string, password : string): Promise<any>{
    let result;
    try {
      const esta = this.auth.authStateReady();
      console.log(esta);
      const userCredential = await signInWithEmailAndPassword(this.auth, username, password);
      console.log('credenciales: ' ,userCredential);
      const {user} = userCredential;
      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token);

      const result = {
        ret: true,
        token: token
      }
      this.router.navigate(['/tabs/perfil']);
      return result;
      
    } catch (error : any) {
      if(error.code in this.error){
        result = {ret: false, data: this.error[error.code as keyof typeof this.error]}
      } else {
        result = {ret: false, data: 'Debe completar ambos campos'}
      }
      return result;
    }
  }

}

