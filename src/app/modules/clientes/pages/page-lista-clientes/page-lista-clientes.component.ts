/*
  page-lista-clientes
  Objetivo:
  - Uso de componente hijo lista-clientes
  - Ejemplo simple de directiva @if

*/
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from "../../../../components/header/header.component";
import { ListaClienteComponent } from '../../components/lista-cliente/lista-cliente.component';
import { ListaCliente2Component } from '../../components/lista-cliente-2/lista-cliente-2.component';

@Component({
  selector: 'app-page-lista-clientes',
  imports: [NavbarComponent, FooterComponent, HeaderComponent, ListaClienteComponent, ListaCliente2Component],
  templateUrl: './page-lista-clientes.component.html',
  styleUrl: './page-lista-clientes.component.css'
})
export class PageListaClientesComponent {

  usarServicio: boolean = true;

}
