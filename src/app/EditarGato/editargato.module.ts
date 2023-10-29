import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGatoPageRoutingModule } from './editargato-routing.module';

import { EditarGatoPage } from './editargato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGatoPageRoutingModule
  ],
  declarations: [EditarGatoPage]
})
export class EditarGatoPageModule {}
