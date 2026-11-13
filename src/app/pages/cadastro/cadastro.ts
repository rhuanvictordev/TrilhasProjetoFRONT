import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  nome: string = '';
  email: string = '';
  senha: string = '';

  cadastrar(): void {
    if (!this.nome || !this.email || !this.senha) {
      this.notification.warning('Preencha todos os campos!');
      return;
    }

    const obj = {
        nome: this.nome,
        email: this.email,
        senha: this.senha
    };

    this.http.post('http://localhost:8080/api/auth/register', obj).subscribe({
      next: () => {
        this.notification.success('Conta criada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error(erro);
        if (erro.status === 409 || erro.status == 403) {
          this.notification.warning('Este e-mail já foi cadastrado!');
        } else {
          this.notification.error('Não foi possível criar a conta!');
        }
      }
    });
  }
}