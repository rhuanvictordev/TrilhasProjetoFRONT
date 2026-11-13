
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
    imports: [FormsModule, RouterLink],
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {

    private notification = inject(NotificationService);
    private http = inject(HttpClient);
    private router = inject(Router);

    email: string = '';
    senha: string = '';

    entrar(): void {
        if (!this.email || !this.senha) {
            this.notification.warning('Preencha o e-mail e a senha!');
            return;
        }

        this.http.post(
            'http://localhost:8080/api/auth/login',
            {
            email: this.email,
            senha: this.senha
            },
            { responseType: 'text' }
        ).subscribe({
            next: (token) => {
            localStorage.setItem('secret', token);

            this.notification.success('Login realizado com sucesso!');

            this.router.navigate(['/trilhas']);
            },
            error: (erro) => {
            console.error('Erro ao realizar login:', erro);
            this.notification.error('E-mail ou senha inválidos!');
            }
        });
        }
}
