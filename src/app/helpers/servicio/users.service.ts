import { Injectable } from '@angular/core';
// ejecutar npm install firebase
import { initializeApp } from 'firebase/app';
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})


// El método doc() se utiliza para obtener una referencia de un documento específico dentro de una colección. 
// Recibe tres parámetros: 
//    *El primero es la configuración de la base de datos.
//    *El segundo es el nombre de la colección que contiene el documento que se quiere obtener.
//    *El tercero es el id del documento que se quiere obtener. (El id del documento del usuario logueado se obtiene con 
//          localStorage.getItem('docRefToken') ya que ahí lo almacenamos al loguearse.)


// El método getDoc() se utiliza para obtener un documento específico en una colección o subcolección. 
// Recibe un parámetro: 
//    *El único parámetro que recibe es la referencia del documento (Obtenida con el método doc() ).


// El método collection() se utiliza para obtener una referencia a una colección.
// Recibe dos parámetros: 
//    *El primero es la referencia al documento padre en el que se encuentra la colección. (El documento padre puede ser la
//          base de datos misma, o la referencia de un documento obtenida con el método doc() )
//    *El segundo es el nombre de la colección a la que se quiere acceder.


// El método query() se utiliza para construir criterios de búsqueda.
// Recibe dos o más parámetros:
//    *El primero es la referencia a la colección (Obtenida con el método collection() ).
//    *La cantidad de parámetros siguientes son métodos, y podemos usar los que necesitemos:
//        *where("email", "==", myEmail)
//        *orderBy('edad', 'asc')
//        *limit(10) 


// El método getDocs() se utiliza para obtener todos los documentos, o solamente aquellos que cumplan con una condición, en una 
// colección o subcolección. 
// Recibe un parámetro: 
//    *El único parámetro que recibe es la referencia de la colección (Obtenida con el método collection() ) o el método query.


//El método addDoc() se utiliza para crear un documento dentro de una colección.
//Recibe dos parámetros: 
//    *El primero es la referencia de la colección donde se desea agregar el documento. (obtenida con el método collection() )
//    *El segundo es un objeto que contiene cada uno de los campos del documento que se va a crear.


//El método updateDoc() se utiliza para actualizar los datos de un documento específico en una colección.
//Recibe dos parámetros: 
//    *El primero es la referencia al documento  que se quiere actualizar. (obtenida con el método doc() )
//    *El segundo es un objeto que contiene los nuevos campos que se van a actualizar.


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
      this.router.navigate(['/Login']);
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

      await this.getIdUserLogin(user.email);

      result = {
        ret: true,
        token: token
      }
      this.router.navigate(['/Perfil']);
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
    const newUser = {
      uid : userCredential.user.uid,
      first: "",
      last: "",
      email: userCredential.user.email,
      creationTime : userCredential.user.metadata.creationTime,
      lastLoginAt : userCredential.user.metadata.lastLoginAt,
      address: "",
      tel: ""
    };

    try {
      await addDoc(collection(this.db, "users"), newUser);

    } catch (error) {
      console.error('Error al crear la colección de usuario', error);
    }
  }

  async createCatColecction(cat : any){
    try {
      const userDocRef = localStorage.getItem('docRefToken');
  
      if(userDocRef){
        cat.qr = '';
        cat.photo = this.formatPhoto(cat.photo);
        
        const userRef = doc(this.db, "users", userDocRef);
        const catsCollectionRef = collection(userRef, "cats");
        const docRef = await addDoc(catsCollectionRef, cat);
        
        const qr = '/gatito-perdido/' + userDocRef + '/' + docRef.id;

        await updateDoc(doc(catsCollectionRef, docRef.id), {
          qr,
        });
        
        return docRef;
      }
      return null;
    } catch (error) {
      console.log("Error al crear un gatito.");
      return null;
    }
  }

  async getUserCatsCollection(){

    let response = {
      ret: false,
      data: []
    }; 

    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const userRef = doc(this.db, "users", userDocRef);
        const catsRef = collection(userRef, 'cats'); 
        const catsDoc = await getDocs(catsRef);
  
        let cats : any = [];
        catsDoc.forEach(catDoc => {
          cats = [...cats, catDoc.data()]
        });
  
        response = {
          ret: true,
          data: cats
        }

      }

      return response;
      
    } catch (error) {
      return response;
    }
  }

  async updateCatCollection(){
    
  }

  //CAMBIAR ESTE MÉTODO PARA OBTENER TODOS LOS GATOS
  // async getAllUserCollection(){
  //   let result;
  //   try {
  //     const users = await getDocs(collection(this.db, "users"));

  //     let allData: any[] = [];
  //     users.forEach((user) => {
  //       let cats = user.data()['cats'];
  //       // console.log(cats);
  //       for(let cat in cats){
  //         allData = [...allData, cats[cat]]

  //       }
        
  //     });
      
  //     // console.log("data vieja: ", allData);
  //     /*let dataFormated = */this.formatPhoto(allData);
  //     // console.log("data formateada: ", dataFormated);

  //     result = {
  //       ret: true,
  //       data: allData
  //     }

  //     return result;
  //   } catch (error) {
  //     result = {
  //       ret: false,
  //       data: []
  //     }
  //     return result;
  //   }
  // }


  async getIdUserLogin(email : string | null) {
    try {
      const usersCollectionRef = collection(this.db, "users");
      const user = await getDocs(query(usersCollectionRef, where("email", "==", email)));

      if (!user.empty) {
        const doc = user.docs[0];
        localStorage.setItem('docRefToken', doc.id);
      } else {
        console.log(`No se encontró ningún usuario con el correo electrónico ${email}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  formatPhoto(photo : string){

      if(photo != ''){
        photo = this.getIdPhoto(photo);
      }
    
    return photo;
  }

  getIdPhoto(enlace : string){
    let id = enlace.match(/\/d\/(.*?)\/view/);
    if (id && id.length > 1) {
      enlace = environment.DRIVE_URL + id[1];
    }
    return enlace; 
  }

}

