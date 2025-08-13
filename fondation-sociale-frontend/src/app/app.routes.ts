import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];