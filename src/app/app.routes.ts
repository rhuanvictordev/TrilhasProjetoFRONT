
import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { authGuard } from './guards/auth.guard';
import { NotFound } from './pages/not-found/not-found';
import { Trilhas } from './pages/trilhas/trilhas';
import { Usuarios } from './pages/usuarios/usuarios';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
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
    path: 'inicio',
    component: Inicio,
    canActivate: [authGuard]
  },
  {
    path: 'trilhas',
    component: Trilhas,
    canActivate: [authGuard]
  },
  {
    path: 'usuarios',
    component: Usuarios,
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFound
  }
];
