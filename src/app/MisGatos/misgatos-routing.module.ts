import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisGatosPage } from './misgatos.page';

const routes: Routes = [
  {
    path: '',
    component: MisGatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisGatosPageRoutingModule {}
