import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    imports: [FormsModule],
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})

export class Cadastro{
    constructor(private router: Router) {}

navegarLogin() {
        this.router.navigate(['/login']);
    }
}