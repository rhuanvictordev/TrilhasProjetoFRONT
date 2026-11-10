import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trilha-angular');
  nome = signal('Rhuan');

  alterarTitulo() {
  this.title.set('Meu Sistema de Trilhas');
}
}
