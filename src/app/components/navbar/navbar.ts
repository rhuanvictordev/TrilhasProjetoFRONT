import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

interface Usuario{
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  usuarioLogado = signal<Usuario | null>(null);
  private notification = inject(NotificationService);

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  carregarInfoUsuario() {
    var token = localStorage.getItem("secret");

    this.http.post<Usuario>('http://localhost:8080/api/auth/info', token).subscribe({
        next: (dados) => {
            this.usuarioLogado.set(dados);
        },
        error: (erro) => {
            console.log('Erro ao buscar info do usuario [HEADER]:', erro);
        }
    });
}

  ngOnInit() {
      this.carregarInfoUsuario();
    }
}