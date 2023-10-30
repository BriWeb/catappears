import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPage } from './router.page';
import { isLoginGuard } from '../helpers/guards/isLogin.guard';
import { isLogoutGuard } from '../helpers/guards/isLogout.guard';

const routes: Routes = [
  {
    path: '',
    component: RouterPage,
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
        path: 'MisGatos',
        loadChildren: () => import('../MisGatos/misgatos.module').then( m => m.MisGatosPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'AgregarGato',
        loadChildren: () => import('../AgregarGato/agregargato.module').then( m => m.AgregarGatoPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'DatosPersonales',
        loadChildren: () => import('../DatosPersonales/datospersonales.module').then( m => m.DatosPersonalesPageModule),
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
export class RouterPageRoutingModule {}
