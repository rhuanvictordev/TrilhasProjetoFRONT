import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../usuarios/usuarios';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

interface Trilha {
  id: number;
  nome: string;
  descricao: string;
  distanciaMetros: number;
}

interface Usuario{
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})

export class Inicio implements OnInit {

private http = inject(HttpClient);
trilhas = signal<Trilha[]>([]);
usuarioLogado = signal<Usuario | null>(null);
idEditando = signal<number | null>(null);
modalAberto = signal(false);
nome = signal('');
descricao = signal('');
distanciaMetros = signal(0);
horarioExpiracao = signal<string | null>(null);
private router = inject(Router);
private notification = inject(NotificationService);

abrirModal() {
  this.modalAberto.set(true);
}

uparConta() {
    var token = localStorage.getItem("secret");

    var obj = { email: this.usuarioLogado()?.email }

    this.http.post('http://localhost:8080/api/usuarios/administrar', obj,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).subscribe({
        next: (res) => {
            if (res === true){
              this.notification.info('Permissões adquiridas com sucesso! recarregando interface, aguarde...');
              setTimeout(()=>{
                  window.location.reload();
              }, 4000)
            }
        },
        error: (erro) => {
            console.log('Erro ao buscar info do usuario:', erro);
            this.router.navigate(['/login']);
            this.notification.info('Acesso expirado!');
            localStorage.clear();
        }
    });
}

fecharModal() {
  this.modalAberto.set(false);
  this.idEditando.set(null);
  this.nome.set('');
  this.descricao.set('');
  this.distanciaMetros.set(0);
}

salvar() {
  const trilha = {
    nome: this.nome(),
    descricao: this.descricao(),
    distanciaMetros: this.distanciaMetros()
  };

  if (this.idEditando() === null) {
    this.http.post('http://localhost:8080/api/trilhas', trilha)
      .subscribe({
        next: () => {
          this.finalizarSalvamento();
        },
        error: (erro) => {
          console.log('Erro ao cadastrar:', erro);
        }
      });
  } else {
    this.http.put(
      `http://localhost:8080/api/trilhas/${this.idEditando()}`,
      trilha
    ).subscribe({
      next: () => {
        this.finalizarSalvamento();
      },
      error: (erro) => {
        console.log('Erro ao editar:', erro);
      }
    });
  }
}

finalizarSalvamento() {
  this.idEditando.set(null);
  this.nome.set('');
  this.descricao.set('');
  this.distanciaMetros.set(0);

  this.fecharModal();
  this.carregarTrilhas();
}

editar(trilha: Trilha) {
  this.idEditando.set(trilha.id);

  this.nome.set(trilha.nome);
  this.descricao.set(trilha.descricao);
  this.distanciaMetros.set(trilha.distanciaMetros);

  this.modalAberto.set(true);
}

deletar(id: number) {
  this.http.delete<boolean>(`http://localhost:8080/api/trilhas/${id}`)
    .subscribe({
      next: () => {
        console.log('Trilha excluída!');
        this.carregarTrilhas();
      },
      error: (erro) => {
        console.log('Erro ao excluir trilha:', erro);
      }
    });
}

carregarTrilhas() {
  this.http.get<Trilha[]>('http://localhost:8080/api/trilhas').subscribe({
    next: (dados) => {
      this.trilhas.set(dados);
    },
    error: (erro) => {
      console.log('Erro ao buscar trilhas:', erro);
    }
  });
}

carregarInfoUsuario() {
    var token = localStorage.getItem("secret");

    this.http.post<Usuario>(
        'http://localhost:8080/api/auth/info',
        token
    ).subscribe({
        next: (dados) => {
            this.usuarioLogado.set(dados);
            console.log(dados);
        },
        error: (erro) => {
            console.log('Erro ao buscar info do usuario:', erro);
            this.router.navigate(['/login']);
            this.notification.info('Acesso expirado!');
            localStorage.clear();
        }
    });
}

carregarExpiracaoToken() {
    var token = localStorage.getItem("secret");
    if (!token) {
        return;
    }
    var payload = JSON.parse(atob(token.split('.')[1]));
    var dataExpiracao = new Date(payload.exp * 1000);
    this.horarioExpiracao.set(
        dataExpiracao.toLocaleTimeString('en-US')
    );
}

    ngOnInit() {
      this.carregarInfoUsuario();
      this.carregarExpiracaoToken();
      //this.carregarTrilhas();
    }
}