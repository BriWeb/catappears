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
      localStorage.removeItem('docRefToken');
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

      await this.createUserCollection(userCredential);
      
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
      
      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token);

      await this.getDocByAccount(user.email);

      result = {
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

      // {
      //   uid : userCredential.user.uid,
      //   first: "",
      //   last: "",
      //   email: userCredential.user.email,
      //   creationTime : userCredential.user.metadata.creationTime,
      //   lastLoginAt : userCredential.user.metadata.lastLoginAt,
      //   cats: [
      //     {
      //       city: '',
      //       description: 'Sin descripción',
      //       location: '',
      //       name: '',
      //       photo: '',
      //       qr: '',
      //       lost: false,
      //       age: 0
      //     },
      //   ]
      // }

  async createUserCollection(userCredential: any) {
    const newUser = {
      uid : userCredential.user.uid,
      first: "",
      last: "",
      email: userCredential.user.email,
      creationTime : userCredential.user.metadata.creationTime,
      lastLoginAt : userCredential.user.metadata.lastLoginAt
    };

    try {
      await addDoc(collection(this.db, "users"), newUser);

      // await this.createCatColecction();
    } catch (error) {
      console.error('Error al crear la colección de usuario', error);
    }
  }

  async createCatColecction(cat : any){
    try {
      const userDocRef = localStorage.getItem('docRefToken');
  
      if(userDocRef){
        const newCat = {
          city: cat.city ? cat.city : "Sin descripción",
          description: cat.description ? cat.description : "Sin descripción",
          location: cat.location ? cat.location : "Sin ubicación",
          name: cat.name ? cat.name : "Sin nombre",
          photo: cat.photo ? cat.photo : "Sin foto",
          qr: cat.qr ? cat.qr : "Sin QR",
          lost: cat.lost ? cat.lost : false,
          age: cat.age ? cat.age : 0,
        };
        const userRef = doc(this.db, "users", userDocRef);
        const catsCollectionRef = collection(userRef, "cats");
        await addDoc(catsCollectionRef, newCat);

      }
    } catch (error) {
      console.log("Error al crear un gatito.");
    }
  }

  async getAllUserCollection(){
    let result;
    try {
      const querySnapshot = await getDocs(collection(this.db, "users"));

      let allData: any[] = [];
      querySnapshot.forEach((doc) => {
        let cats = doc.data()['cats'];
        // console.log(cats);
        for(let cat in cats){
          allData = [...allData, cats[cat]]

        }
        
      });
      
      console.log("data vieja: ", allData);
      /*let dataFormated = */this.formatPhoto(allData);
      // console.log("data formateada: ", dataFormated);

      result = {
        ret: true,
        data: allData
      }

      return result;
    } catch (error) {
      result = {
        ret: false,
        data: []
      }
      return result;
    }
  }

  async getUserCollection() {
    let result = {
      ret: false,
      data: []
    };
    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const userRef = doc(this.db, "users", userDocRef);
        const userDocSnapshot = await getDoc(userRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          this.formatPhoto(userData['cats']);
          result = {
            ret: true,
            data: userData['cats']
          };
        } else {
          result = {
            ret: false,
            data: []
          };
        }
      }
      return result;
  
    } catch (error) {
      result = {
        ret: false,
        data: []
      }
      return result;
    }
  }

  async getDocByAccount(email : string | null) {
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

  formatPhoto(data : Array<any>){
    for(let i = 0; i<data.length;i++){
      let photo = data[i]['photo'];
      if(photo != ''){
        photo = this.getIdPhoto(photo);
        data[i]['photo'] = photo;
      }
    }
    // return data;
  }

  getIdPhoto(enlace : string){
    let id = enlace.match(/\/d\/(.*?)\/view/);
    if (id && id.length > 1) {
      enlace = environment.DRIVE_URL + id[1];
    }
    return enlace; 
  }

}

