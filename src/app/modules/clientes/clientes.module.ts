import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';

import { FichaClienteNgformComponent } from './components/ficha-cliente-ngform/ficha-cliente-ngform.component';
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
    FichaClienteNgformComponent,
    ListaClienteComponent
  ],
  exports: [
    CommonModule,
    ClientesRoutingModule,
    FichaClienteNgformComponent,
    ListaClienteComponent
  ]
})
export class ClientesModule { }
