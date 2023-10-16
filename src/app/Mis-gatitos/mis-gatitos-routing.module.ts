import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisGatitosPage } from './mis-gatitos.page';

const routes: Routes = [
  {
    path: '',
    component: MisGatitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisGatitosPageRoutingModule {}
