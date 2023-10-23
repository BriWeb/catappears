import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegGatitoPageRoutingModule } from './reg-gatito-routing.module';

import { RegGatitoPage } from './reg-gatito.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegGatitoPageRoutingModule,
  ],
  declarations: [RegGatitoPage,]
})
export class RegGatitoPageModule {}
