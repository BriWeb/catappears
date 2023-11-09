import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPage } from './router.page';
import { isLoginGuard } from '../helpers/guards/isLogin.guard';
import { isLogoutGuard } from '../helpers/guards/isLogout.guard';
// import {ScanerComponent} from '../components/scaner/scaner.component';

const routes: Routes = [
  {
    path: '',
    component: RouterPage,
    children: [
      // {
      //   path: 'Escanear',
      //   component: ScanerComponent
      // },
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
        path: 'Mis-Gatos',
        loadChildren: () => import('../MisGatos/misgatos.module').then( m => m.MisGatosPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'Agregar-Gato',
        loadChildren: () => import('../AgregarGato/agregargato.module').then( m => m.AgregarGatoPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'Datos-Personales',
        loadChildren: () => import('../DatosPersonales/datospersonales.module').then( m => m.DatosPersonalesPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'Editar-Gato/:id',
        loadChildren: () => import('../EditarGato/editargato.module').then( m => m.EditarGatoPageModule),
        canActivate: [isLoginGuard]
      },
      {
        path: 'Mostrar-Gato/:user_id/:cat_id',
        loadChildren: () => import('../MostrarGato/mostrargato.module').then( m => m.MostrarGatoPageModule)
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
