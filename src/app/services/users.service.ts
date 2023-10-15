import { Injectable } from '@angular/core';
// ejecutar npm install firebase
import { initializeApp } from 'firebase/app';
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
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

  async createEmail(username : string, password : string): Promise<any>{
    let result;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, username, password);
      
      const {user} = userCredential;
      result = {
        ret: true, 
        data: user
      }

      const docRef = await this.createUserCollection(userCredential);
      
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
      // const esta = this.auth.authStateReady();
      const userCredential = await signInWithEmailAndPassword(this.auth, username, password);
      const {user} = userCredential;
      await this.getDocByEmail(user.email);

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

  async createUserCollection(userCredential: any) {
    try {
  
      const docRef = await addDoc(collection(this.db, "users"), {
        uid : userCredential.user.uid,
        first: "",
        last: "",
        email: userCredential.user.email,
        creationTime : userCredential.user.metadata.creationTime,
        lastLoginAt : userCredential.user.metadata.lastLoginAt,
      });

      return docRef;
    } catch (error) {
      console.error('Error al crear la colección de usuario', error);
      return error;
    }
  }

  async getAllUserCollection(){
    try {
      const querySnapshot = await getDocs(collection(this.db, "users"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`${doc.id} => ` + JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserCollection() {
    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const userRef = doc(this.db, "users", userDocRef);
        const userDocSnapshot = await getDoc(userRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log(userData);
        } else {
          console.log(`El usuario con ID ${userDocRef} no existe.`);
        }
      }
  
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getDocByEmail(email : string | null) {
    try {
      const usersCollectionRef = collection(this.db, "users");
      const querySnapshot = await getDocs(query(usersCollectionRef, where("email", "==", email)));

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        localStorage.setItem('docRefToken', doc.id);
      } else {
        console.log(`No se encontró ningún usuario con el correo electrónico ${email}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

}

