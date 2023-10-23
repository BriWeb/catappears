import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisGatitosPageRoutingModule } from './mis-gatitos-routing.module';

import { MisGatitosPage } from './mis-gatitos.page';
import { QrCatComponent } from '../qr-cat/qr-cat.component';
import { QRCodeModule } from 'angularx-qrcode';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisGatitosPageRoutingModule,
    QRCodeModule
  ],
  declarations: [MisGatitosPage,QrCatComponent]
})
export class MisGatitosPageModule {}
