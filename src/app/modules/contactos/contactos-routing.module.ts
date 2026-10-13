import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListaContactosComponent } from './pages/page-lista-contactos/page-lista-contactos.component';
import { PageFichaContactosComponent } from './pages/page-ficha-contactos/page-ficha-contactos.component';

const routes: Routes = [
    { path: 'lista-contactos', component: PageListaContactosComponent},
    { path: 'ficha-contactos', component: PageFichaContactosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { 

}
