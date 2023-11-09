import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScanerComponent } from './components/scaner/scaner.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Router/router.module').then(m => m.RouterPageModule)
  },
  {
    path: 'Escanear',
    component: ScanerComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
