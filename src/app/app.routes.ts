import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import { AppComponent } from './app.component';
import { EjemploComponent } from './pages/ejemplo/ejemplo.component';
//import { ListaClienteComponent } from './modules/clientes/components/lista-cliente/lista-cliente.component';
import { PageClientesComponent } from './modules/clientes/pages/page-clientes/page-clientes.component';
import { PageListaClientesComponent } from './modules/clientes/pages/page-lista-clientes/page-lista-clientes.component';
import { ListaCliente2Component } from './modules/clientes/components/lista-cliente-2/lista-cliente-2.component';


export const routes: Routes = [
    { path:'', component:HomeComponent},         // localhost:4200    
    { path:'home', component:HomeComponent},    //localhost:4200/home
    { path: 'dashboard', component: DashboardComponent },
    { path: 'prueba', component: EjemploComponent },

    { path: 'lista-clientes', component: PageListaClientesComponent },
    { path: 'lista-clientes2', component: ListaCliente2Component },
    { path: 'clientes', component: PageClientesComponent },

    //{ path:'**', component:NotFoundComponent},
    { path:'**', redirectTo:'home'}
];
