import { Component, input } from '@angular/core';
import { Empresa } from '../../models/cliente.model';

@Component({
  selector: 'app-ficha-cliente',
  imports: [],
  templateUrl: './ficha-cliente.component.html',
  styleUrl: './ficha-cliente.component.css'
})

export class FichaClienteComponent {

  // parametro de entrada para recibir la empresa seleccionada desde el componente padre
  // @Input() empresa: Empresa | null = null;
  // @Input() empresa: Empresa = { codigo: '', nombre: '', nif: '', direccion: { calle: '', numero: 0, provincia: '' } }; 
  empresaSeleccionada = input<Empresa | null>();


  // empresa: Empresa = {
  //   codigo: 'COD-260001',
  //   nombre: 'Empresa 1',
  //   nif: '2678984-A',
  //   direccion: {
  //     calle: 'los olmos',
  //     numero: 24,
  //     provincia: 'Madrid'
  // }};

  // empresa: Empresa | null | undefined = null;

  // constructor() {
  //   this.empresa = this.empresaSeleccionada();
  // }

  
}
