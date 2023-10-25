import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarGatoPage } from './agregargato.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarGatoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarGatoPageRoutingModule {}
