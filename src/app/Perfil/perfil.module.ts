import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilPage } from './perfil.page';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PerfilPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
