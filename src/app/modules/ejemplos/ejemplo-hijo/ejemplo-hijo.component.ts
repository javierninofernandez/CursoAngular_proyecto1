import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-ejemplo-hijo',
  imports: [],
  templateUrl: './ejemplo-hijo.component.html',
  styleUrl: './ejemplo-hijo.component.css'
})
export class EjemploHijoComponent {

  datos = signal<string>('');

  enviarAlPadre() {
    if (this.datos().trim() !== '') {
      return;
    }
  }

  
}
