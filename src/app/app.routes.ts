import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PageListaClientesComponent } from './modules/clientes/pages/page-lista-clientes/page-lista-clientes.component';
//import { ListaClienteFinalComponent } from './modules/clientes/components/lista-cliente-final/lista-cliente-final.component';
import { PageListaClienteFinalComponent } from './modules/clientes/pages/page-lista-cliente-final/page-lista-cliente-final.component';
//import { PageClientesComponent } from './modules/clientes/pages/page-clientes/page-clientes.component';
//import { FichaClienteComponent } from './modules/clientes/components/ficha-cliente/ficha-cliente.component';
import { PageFichaClienteComponent } from './modules/clientes/pages/page-ficha-cliente/page-ficha-cliente.component';
import { PageNotfoundComponent } from './shared/pages/page-notfound/page-notfound.component';



export const routes: Routes = [
    { path:'', component:HomeComponent},         // localhost:4200    
    { path:'home', component:HomeComponent},    //localhost:4200/home
    { path: 'dashboard', component: DashboardComponent },

    { path: 'lista-clientes', component: PageListaClientesComponent },
    { path: 'lista-clientes-final', component: PageListaClienteFinalComponent },

    { path: 'ficha-cliente', component: PageFichaClienteComponent },                //ficha cliente sin parametro (uso insercion)
    { path: 'ficha-cliente/editar/:id', component: PageFichaClienteComponent },     //ficha cliente con parametro id  (uso visualización/edición)

    { path:'**', component:PageNotfoundComponent},      
    //{ path:'**', redirectTo:'home'} // redirigir a otra pagina por defecto de nuestra app (ej. dashboard/home/...)
];
