import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterPageRoutingModule } from './router-routing.module';

import { RouterPage } from './router.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterPageRoutingModule,
    QRCodeModule
  ],
  declarations: [RouterPage]
})
export class RouterPageModule {}
