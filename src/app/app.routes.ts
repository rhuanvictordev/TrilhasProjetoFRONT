import { Routes } from '@angular/router';
import { Trilhas } from './pages/trilhas/trilhas';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
  {
    path: '',
    component: Trilhas
  },
  {
    path: 'login',
    component : Login
  },
  {
    path: 'cadastro',
    component : Cadastro
  }
];