import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Trilha {
  id: number;
  nome: string;
  descricao: string;
  distanciaMetros: number;
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
idEditando = signal<number | null>(null);
modalAberto = signal(false);
nome = signal('');
descricao = signal('');
distanciaMetros = signal(0);

abrirModal() {
  this.modalAberto.set(true);
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

    ngOnInit() {
        this.carregarTrilhas();
    }
}