import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithPopup/*, FacebookAuthProvider*/, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})


// El método doc() se utiliza para obtener una referencia de un documento específico dentro de una colección. 
// Recibe tres parámetros: 
//    *El primero es la referencia al documento padre en el que se encuentra la colección. (El documento padre puede ser la
//          base de datos misma, o la referencia de un documento obtenida con el método doc() )
//    *El segundo es el nombre de la colección que contiene el documento que se quiere obtener.
//    *El tercero es el id del documento que se quiere obtener. (El id del documento del usuario logueado se obtiene con 
//          localStorage.getItem('docRefToken') ya que ahí lo almacenamos al loguearse.)


// El método getDoc() se utiliza para obtener un documento específico en una colección o subcolección. 
// Recibe un parámetro: 
//    *El único parámetro que recibe es la referencia del documento (Obtenida con el método doc() ).


// El método deleteDoc() se utiliza para eliminar un documento específico en una colección o subcolección. 
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
  // provider = new FacebookAuthProvider();

  isLogged(){
    return localStorage.getItem('accessToken') ? true : false;
  }

  async logout(){
    try {
      await signOut(this.auth);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('docRefToken');
      window.location.reload()
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async createEmail(username : string, password : string): Promise<any>{
    let result;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, username, password);
      
      const {user} = userCredential;
      await sendEmailVerification(user);

      result = {
        ret: true, 
        data: user
      }

      await this.createUserDocument(userCredential);

      
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
      const userCredential = await signInWithEmailAndPassword(this.auth, username, password);
      const {user} = userCredential;
      
      if(!user.emailVerified){
        await sendEmailVerification(user);
        result = {ret: false, data: "Recibirá un mail, revise su 'Bandeja de entrada' o 'Correo no deseado'."};
        return result;
      }

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

  async createGoogleAccount(): Promise<any> {
    try {
      const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const {user} = userCredential;
      
      const token = await user.getIdToken();
      localStorage.setItem('accessToken', token);

      const collectionRef = collection(this.db, 'users');

      let id : any;
      let result;

      result = await getDocs(query(collectionRef, where("uid", "==", user.uid))); 

      if (result.empty) {
        result = await this.createUserDocument(userCredential);
        if(result){
          id = result.id;
        }
      }else {
        id = result?.docs[0].id;
      }

      localStorage.setItem('docRefToken', id);
      this.router.navigate(['/Perfil']);

    } catch (error) {
      console.log('Error al iniciar sesión con Google: ', error);
    }
  }

  // async createFacebookAccount(): Promise<any> {
  //   const provider = new FacebookAuthProvider();

  //   try {
  //     const userCredential = await signInWithPopup(this.auth, provider);
  //     const {user} = userCredential;

  //     const credential = FacebookAuthProvider.credentialFromResult(userCredential);
  //     const accessToken = credential?.accessToken;
  //     console.log("usuario: ", credential, accessToken )
      
  //     const token = await user.getIdToken();
  //     localStorage.setItem('accessToken', token);

  //     const collectionRef = collection(this.db, 'users');

  //     let id : any;
  //     let result;

  //     result = await getDocs(query(collectionRef, where("uid", "==", user.uid))); 

  //     if (result.empty) {
  //       result = await this.createUserDocument(userCredential);
  //       if(result){
  //         id = result.id;
  //       }
  //     }else {
  //       id = result?.docs[0].id;
  //     }

  //     localStorage.setItem('docRefToken', id);
  //     this.router.navigate(['/Perfil']);

  //   } catch (error) {
  //     console.log('Error al iniciar sesión con Facebook: ', error);
  //   }
  // }

  async resetPassword(email: string): Promise<any> {
    try {
      await sendPasswordResetEmail(this.auth, email);

      return true;

    } catch (error) {
      return false;
    }
  }

  async createUserDocument(userCredential: any) {
    const newUser = {
      uid : userCredential.user.uid,
      first: "",
      last: "",
      email: userCredential.user.email,
      creationTime : userCredential.user.metadata.creationTime,
      lastLoginAt : userCredential.user.metadata.lastLoginAt,
      address: "",
      tel: "",
      photo: ""
    };

    try {
      const document = await addDoc(collection(this.db, "users"), newUser);
      return document;
    } catch (error) {
      console.error('Error al crear la colección de usuario', error);
      return null;
    }
  }

  async getUserDocument(){

    let response = {
      ret: false,
      data: [] as any [],
    }; 

    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const userRef = doc(this.db, "users", userDocRef);
        const user = await getDoc(userRef)
       
         response = {
          ret: true,
          data: [user.data()]
         }
        
        }
        return response
      } catch (error) {
     return response
    }
  }

  async getCatDocument(id_user : string, id_cat : string){
    
    let response = {
      ret : false,
      data: {} as any
    }

    try {
      let userDocRef = doc(this.db, 'users', id_user);

      let catDocRef =  doc(userDocRef, 'cats', id_cat);

      let catDoc = await getDoc(catDocRef);

      response = {
        ret : true,
        data: catDoc.data()
      }

      return response;

    } catch (error) {
      return response;
    }
  }

  async getUserAndCatDocuments(cat_id : string, user_id : string){
    let response = {
      ret: false,
      data: {
        user : {},
        cat : {}
      } as any
    }

    try {
      const userRef = doc(this.db, "users", user_id);
      let userDoc = await getDoc(userRef);
      let user = userDoc.data();

      const catRef = doc(userRef, "cats", cat_id);
      let catDoc = await getDoc(catRef);
      let cat = catDoc.data();

      response = {
        ret: true,
        data: {
          user : user,
          cat : cat
        }
      }

      return response;
    } catch (error) {
      return response;
    }
  }
  
  async createCatDocument(cat : any){
    try {
      const userDocRef = localStorage.getItem('docRefToken');
  
      if(userDocRef){
        cat.qr = '';
        cat.photo = this.formatPhoto(cat.photo);
        
        const userRef = doc(this.db, "users", userDocRef);
        const catsCollectionRef = collection(userRef, "cats");
        const docRef = await addDoc(catsCollectionRef, cat);
        
        const qr = '/Mostrar-Gato/' + userDocRef + '/' + docRef.id;

        await updateDoc(doc(catsCollectionRef, docRef.id), {
          qr,
        });
        
        return docRef;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getUsersCatsLost(){
    
    let result = {
      ret: false,
      data: []
    };

    const catPromises : any = [];
    let catsToShow : any = [];

    try {
      // Obtiene todos los documentos de la colección "users"
      const users = await getDocs(collection(this.db, "users"));
      
      // Recorre los documentos
      users.forEach(userDoc => {
        // Por cada documento obtenemos su referencia
        let docRef = doc(this.db, 'users', userDoc.id); 
        // Por cada documento obtenemos su subcolección 'cats'
        let collectionRef = collection(docRef, 'cats');

        // Dentro de la subcolección obtenemos todos aquellos documentos que cumplen con la condición
        // Al ser muchas promesas, las guardamos en el array para ejecutarlas todas a la vez en una sola llamada
        let catsPromise = getDocs(query(collectionRef, where("lost", "==", true)));
        catPromises.push(catsPromise);
      });
      const userCats = await Promise.all(catPromises);
      
      // Recorremos los documentos        
      userCats.forEach(cats => {
        cats.forEach((cat: any) => {
          // Agregamos el documento al array
          catsToShow.push(cat.data());
        })
      })

      result = {
        ret: true,
        data: catsToShow
      };

      return result;
    } catch (error) {

      return result;
    }
  }

  async editUserDocument(user : any){
    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        if(user.photo != ''){
          let photo = this.formatPhoto(user.photo);
          user.photo = photo;
        }
        const userRef = doc(this.db, "users", userDocRef);
        await updateDoc(userRef, user);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async editCatDocument(cat : any, id_cat : string){
    try {
      const userDocId = localStorage.getItem('docRefToken');
      if(userDocId){

        let userDocRef = doc(this.db, 'users', userDocId);

        let catDocRef =  doc(userDocRef, 'cats', id_cat);
        if(cat.photo != ''){
          let photo = this.formatPhoto(cat.photo);
          cat.photo = photo;
        }

        await updateDoc(catDocRef, cat);
        return true;
      }
      return false;
    } catch (error) {
      return false;
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
          cats = [...cats, {...catDoc.data(), 'id' : catDoc.id}]
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

  async updateCatDocument(){
    
  }

  async deleteCatDocument(id : string){
    let deleted = false;

    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const userRef = doc(this.db, "users", userDocRef);
        const catsRef = doc(userRef, "cats", id);
        
        await deleteDoc(catsRef);
        deleted = true;
        return deleted;
      }
      return deleted;
    } catch (error) {
      return deleted;
    }
  }

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
    if (enlace.includes('https://drive.google.com/uc?export=download&id=')) {
      return enlace;
    }

    let id = enlace.match(/\/d\/(.*?)\/view/);
    if (id && id.length > 1) {
      enlace = environment.DRIVE_URL + id[1];
    }
    return enlace; 
  }

}

