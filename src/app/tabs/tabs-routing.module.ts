import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { isLoginGuard } from '../guards/isLogin.guard';
import { isLogoutGuard } from '../guards/isLogout.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../Login/login.module').then(m => m.LoginPageModule),
        canActivate: [isLogoutGuard]
      },
      {
        path: 'inicio',
        loadChildren: () => import('../Inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../Perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
