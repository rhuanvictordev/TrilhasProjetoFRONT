
import { Routes } from '@angular/router';
import { Trilhas } from './pages/trilhas/trilhas';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { authGuard } from './guards/auth.guard';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'trilhas',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'trilhas',
    component: Trilhas,
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFound
  }
];
