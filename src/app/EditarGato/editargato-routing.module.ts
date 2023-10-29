import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGatoPage } from './editargato.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGatoPageRoutingModule {}
