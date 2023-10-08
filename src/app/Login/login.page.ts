import { Component, ViewChild} from '@angular/core';
import { IonInput, IonModal } from '@ionic/angular';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'LoginPage',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage {
  
  constructor(private servicio: UsersService) {}

  @ViewChild('passInput', { static: false }) passInput: IonInput | undefined;

  signIn = {
    user: '',
    pass: ''
  };
  signUp = {
    user: '',
    pass: ''
  };
  showPassword = false;
  error: string = '';
  count: Number = 1;
 
  @ViewChild(IonModal) modal: IonModal | undefined;

  openModal(event?: Event) {
    this.modal?.present();
  }
  closeModal() {
    this.modal?.dismiss();
    this.signUp.pass = '';
    this.signUp.user = '';
  }

  togglePasswordVisibility(event?: Event) {
    this.showPassword = !this.showPassword;
    if(this.passInput){
      this.passInput.setFocus();
    }
  }

  showLoading(){
    document.getElementById("loading")?.setAttribute('is-open', 'true');
  }
  hideLoading(){
    document.getElementById("loading")?.setAttribute('is-open', 'false');
  }

  onWillDismiss() {
    this.setError();
  }

  setError(message: string = ''){
    this.error = message;
    console.log('error desde login: ', this.error);
  }
  async handleSignUp(){
    try {
      this.showLoading();
      this.setError();
      const result = await this.servicio.createEmail(this.signUp.user, this.signUp.pass);

      const { ret, data } = result;

      if (!ret) {
        this.setError(data);
        return;
      }
      this.modal?.dismiss();
      this.signUp.pass = '';
      this.signUp.user = '';

    } catch (error: any) {
      this.setError(error);
    } finally{
      this.hideLoading();
    }
  }

  async handleSignIn(){
    try {
      this.showLoading();
      this.setError();
      console.log(this.signIn.user, this.signIn.pass);
      const result = await this.servicio.loginEmail(this.signIn.user, this.signIn.pass);

      const { ret, data } = result;

      if(!ret){
        this.setError(data);
        return;
      } 

      this.signIn.pass = '';
      this.signIn.user = '';
      this.modal?.dismiss();

    } catch (error: any) {
      this.setError(error);
    } finally{
      this.hideLoading();
    }
  }

}
