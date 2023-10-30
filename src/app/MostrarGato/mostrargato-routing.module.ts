import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarGatoPage } from './mostrargato.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarGatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarGatoPageRoutingModule {}
