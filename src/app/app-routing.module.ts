import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isLoginGuard } from './guards/isLogin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mis-gatitos',
    loadChildren: () => import('./Mis-gatitos/mis-gatitos.module').then( m => m.MisGatitosPageModule),
    canActivate: [isLoginGuard]
  },
  {
    path: 'reg-gatito',
    loadChildren: () => import('./reg-gatito/reg-gatito.module').then( m => m.RegGatitoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
