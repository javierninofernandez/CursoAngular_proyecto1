import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosRoutingModule } from './contactos-routing.module';
import { PageListaContactosComponent } from './pages/page-lista-contactos/page-lista-contactos.component';
import { PageFichaContactosComponent } from './pages/page-ficha-contactos/page-ficha-contactos.component';


@NgModule({
  declarations: [
    //PageListaContactosComponent,
    //PageFichaContactosComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    PageListaContactosComponent,
    PageFichaContactosComponent
  ]
})
export class ContactosModule { }
