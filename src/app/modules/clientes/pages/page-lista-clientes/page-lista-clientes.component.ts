import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from "../../../../components/header/header.component";
import { ListaClienteComponent } from '../../components/lista-cliente/lista-cliente.component';

@Component({
  selector: 'app-page-lista-clientes',
  imports: [NavbarComponent, FooterComponent, HeaderComponent, ListaClienteComponent],
  templateUrl: './page-lista-clientes.component.html',
  styleUrl: './page-lista-clientes.component.css'
})
export class PageListaClientesComponent {

}
