import { Component, ViewChild} from '@angular/core';
import { IonInput, IonModal} from '@ionic/angular';
import {UsersService} from '../helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';

@Component({
  selector: 'LoginPage',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage{
  
  constructor(private usersService: UsersService, private notificationsService: NotificationsService) {}

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

  setSignInToEmpty(){
    this.signIn.pass = '';
    this.signIn.user = '';
  }
  
  async handleSignUp(){
    try {
      this.showLoading();
      const result = await this.usersService.createEmail(this.signUp.user, this.signUp.pass);

      const { ret, data } = result;

      if (!ret) {
        this.notificationsService.showError(data, 'Error');

        return;
      }

      this.notificationsService.showSuccess("Cuenta creada correctamente.", 'Éxito');
      this.closeModal();
      this.setSignInToEmpty();

    } catch (error: any) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    } finally{
      this.hideLoading();
    }
  }

  async handleSignIn(){
    try {
      this.showLoading();
      const result = await this.usersService.loginEmail(this.signIn.user, this.signIn.pass);

      const { ret, data } = result;

      if(!ret){
        this.notificationsService.showError(data, 'Error');
        return;
      } 

      this.signIn.pass = '';
      this.signIn.user = '';

    } catch (error: any) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    } finally{
      this.hideLoading();
    }
  }
}
