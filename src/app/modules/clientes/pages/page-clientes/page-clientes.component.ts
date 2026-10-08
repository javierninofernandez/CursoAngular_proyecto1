import { Component,input,signal } from '@angular/core';
import { ListaClienteComponent } from '../../components/lista-cliente/lista-cliente.component';
import { FichaClienteComponent } from '../../components/ficha-cliente/ficha-cliente.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { Empresa } from "../../models/cliente.model";

@Component({
  selector: 'app-page-clientes',
  imports: [ListaClienteComponent, FichaClienteComponent, NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './page-clientes.component.html',
  styleUrl: './page-clientes.component.css'
})
export class PageClientesComponent {


  // Declaración de la señal para recibir la empresa seleccionada desde ListaClienteComponent
  inputEmpresaSeleccionada =  signal<Empresa | null>(null);

  // empresaSeleccionada: Empresa | null = null;

  // seleccionarEmpresa(empresa: Empresa | null) {
  //   if (empresa) {
  //     this.empresaSeleccionada = empresa;
  //     this.inputEmpresaSeleccionada.set(empresa); // Actualiza la señal con la empresa seleccionada
  //   }
  //   console.log('Empresa recibida:', empresa);
  // }
  seleccionarEmpresa(empresa: Empresa): void {
    this.inputEmpresaSeleccionada.set(empresa);
    console.log('Empresa recibida:', empresa);
  }
  
}
