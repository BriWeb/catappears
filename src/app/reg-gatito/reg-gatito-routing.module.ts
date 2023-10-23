import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegGatitoPage } from './reg-gatito.page';

const routes: Routes = [
  {
    path: '',
    component: RegGatitoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegGatitoPageRoutingModule {}
