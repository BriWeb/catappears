import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isLoginGuard } from './guards/isLogin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'MisGatos',
    loadChildren: () => import('./MisGatos/misgatos.module').then( m => m.MisGatosPageModule),
    canActivate: [isLoginGuard]
  },
  {
    path: 'AgregarGato',
    loadChildren: () => import('./AgregarGato/agregargato.module').then( m => m.AgregarGatoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
