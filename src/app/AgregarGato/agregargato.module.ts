import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarGatoPageRoutingModule } from './agregargato-routing.module';

import { AgregarGatoPage } from './agregargato.page';

// import { BackToPerfilComponent } from '../components/back-to-perfil/back-to-perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarGatoPageRoutingModule
  ],
  declarations: [AgregarGatoPage/*,BackToPerfilComponent*/]
})
export class AgregarGatoPageModule {}
