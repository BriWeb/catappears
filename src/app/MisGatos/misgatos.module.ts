import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisGatosPageRoutingModule } from './misgatos-routing.module';

import { MisGatosPage } from './misgatos.page';
import { QrCatComponent } from '../components/qr-cat/qr-cat.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CardCatComponent } from '../components/card-cat/card-cat.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisGatosPageRoutingModule,
    QRCodeModule
  ],
  declarations: [MisGatosPage, QrCatComponent, CardCatComponent]
})
export class MisGatosPageModule {}
