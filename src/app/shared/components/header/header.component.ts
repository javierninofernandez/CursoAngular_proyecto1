import { Component,input } from '@angular/core';


// forma tradicional de declarar un input
// @input titulo: string = '';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // forma nueva de declarar un input (con señales)
  titulo = input<string>('');

}
