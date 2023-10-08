import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LoginPageRoutingModule } from './login-routing.module';
import {AlertComponent} from '../components/alert/alert.component'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, AlertComponent]
})
export class LoginPageModule {}
