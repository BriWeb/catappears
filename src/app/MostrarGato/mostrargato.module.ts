import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarGatoPageRoutingModule } from './mostrargato-routing.module';

import { MostrarGatoPage } from './mostrargato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarGatoPageRoutingModule
  ],
  declarations: [MostrarGatoPage]
})
export class MostrarGatoPageModule {}
