import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';

import { FichaClienteComponent } from './components/ficha-cliente/ficha-cliente.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';


@NgModule({
  declarations: [
    // Componentes que contiene el Modulo (ejemplos)
    // FichaClienteComponent,    
    // ListaClientesComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    // van aqui porque estamos trabajando con componentes standalone
    FichaClienteComponent,
    ListaClienteComponent
  ],
  exports: [
    CommonModule,
    ClientesRoutingModule,
    FichaClienteComponent,
    ListaClienteComponent
  ]
})
export class ClientesModule { }
