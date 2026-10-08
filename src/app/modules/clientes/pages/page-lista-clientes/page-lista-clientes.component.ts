/*
  page-lista-clientes
  Objetivo:
  - Uso de componente hijo lista-clientes / lista-clientes-2 (con servicio basico)
  - uso de ngModel para vincular el valor de los radiobuttons HTML con la propiedad usarServicio TS (importar FormsModule)
  - Ejemplo simple de directiva @if para su seleccion. (Nota: Posibilidad de hacerlo con ngTemplate)
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { ListaClienteComponent } from '../../components/lista-cliente/lista-cliente.component';
import { ListaCliente2Component } from '../../components/lista-cliente-2/lista-cliente-2.component';

@Component({
  selector: 'app-page-lista-clientes',
  imports: [
    NavbarComponent, FooterComponent, HeaderComponent, 
    ListaClienteComponent, ListaCliente2Component,
    FormsModule
  ],
  templateUrl: './page-lista-clientes.component.html',
  styleUrl: './page-lista-clientes.component.css'
})
export class PageListaClientesComponent {

  usarServicio: boolean = true;

}
