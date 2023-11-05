import { Component, ViewChild} from '@angular/core';
import { IonInput} from '@ionic/angular';
import {UsersService} from '../helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'LoginPage',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage{
  
  constructor(private usersService: UsersService, private notificationsService: NotificationsService, private modalController: ModalController) {}

  @ViewChild('passInput', { static: false }) passInput: IonInput | undefined;

  signIn = {
    user: '',
    pass: ''
  };
  signUp = {
    user: '',
    pass: ''
  };
  reset = {
    user: '',
  }
  showPassword = false;
 

  async dismissResetModal() {
    await this.modalController.dismiss();
  }
  
  async dismissSignUpModal() {
    await this.modalController.dismiss();
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
  
  async createGoogle(){
    try {
      await this.usersService.createGoogleAccount();
    } catch (error) {
      console.log(error);
    }
  }

  // async createFacebook(){
  //   try {
  //     await this.usersService.createFacebookAccount();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  
  async handleSignUp(){
    try {
      this.showLoading();
      const result = await this.usersService.createEmail(this.signUp.user, this.signUp.pass);

      const { ret, data } = result;

      if (!ret) {
        this.notificationsService.showError(data, 'Error');

        return;
      }
      this.notificationsService.showInfo("Recibirá un mail, revise su 'Bandeja de entrada' o 'Correo no deseado'.", 'Verifique su cuenta');

      this.dismissSignUpModal();
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

  async handleReset(){
    try {
      this.showLoading();
      const result = await this.usersService.resetPassword(this.reset.user);

      if(!result){
        this.notificationsService.showError("Imposible reiniciar.", 'Error');
        return;
      } 

      this.notificationsService.showInfo("Recibirá un mail, revise su 'Bandeja de entrada' o 'Correo no deseado'.", 'Reinicie su contraseña');

      this.dismissResetModal();
      this.reset.user = '';

    } catch (error: any) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    } finally{
      this.hideLoading();
    }
  }
}
