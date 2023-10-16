import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisGatitosPageRoutingModule } from './mis-gatitos-routing.module';

import { MisGatitosPage } from './mis-gatitos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisGatitosPageRoutingModule
  ],
  declarations: [MisGatitosPage]
})
export class MisGatitosPageModule {}
