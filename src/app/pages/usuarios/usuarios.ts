import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

interface Usuario{
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})

export class Usuarios{
  usuarios = signal<Usuario[] | null>(null);
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  excluir(id: number) {
    var token = localStorage.getItem("secret");
    this.http.delete<boolean>(`http://localhost:8080/api/usuarios/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).subscribe({
        next: (res) => {
            if (res === true) {
                this.notification.success('Usuário excluído com sucesso!');
                this.carregarUsuarios();
            }
        },
        error: (erro) => {
            console.log('Erro ao excluir usuário:', erro);
            this.notification.info('Erro ao excluir usuário!');
        }
    });
}

  editar(){

  }

  carregarUsuarios() {
  this.http.get<Usuario[]>('http://localhost:8080/api/usuarios').subscribe({
    next: (dados) => {
      this.usuarios.set(dados);
    },
    error: (erro) => {
      console.log('Erro ao buscar usuarios:', erro);
    }
  });
}

  ngOnInit() {
      this.carregarUsuarios();
    }
}