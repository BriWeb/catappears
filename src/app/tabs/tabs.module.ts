import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { QRCodeModule } from 'angularx-qrcode';
// import {LogoutComponent} from '../components/logout/logout.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    QRCodeModule
  ],
  declarations: [TabsPage/*, LogoutComponent*/]
})
export class TabsPageModule {}
