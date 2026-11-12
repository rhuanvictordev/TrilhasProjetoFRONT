import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
    imports: [FormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

    constructor(private router: Router) {}

    navegarCadastro() {
        this.router.navigate(['/cadastro']);
    }
}