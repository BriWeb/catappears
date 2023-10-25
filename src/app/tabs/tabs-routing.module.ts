import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { isLoginGuard } from '../guards/isLogin.guard';
import { isLogoutGuard } from '../guards/isLogout.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'Login',
        loadChildren: () => import('../Login/login.module').then(m => m.LoginPageModule),
        canActivate: [isLogoutGuard]
      },
      {
        path: 'Inicio',
        loadChildren: () => import('../Inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'Perfil',
        loadChildren: () => import('../Perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: '',
        redirectTo: '/Login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
