import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PageListaClientesComponent } from './modules/clientes/pages/page-lista-clientes/page-lista-clientes.component';
import { PageListaClienteFinalComponent } from './modules/clientes/pages/page-lista-cliente-final/page-lista-cliente-final.component';
//import { PageClientesComponent } from './modules/clientes/pages/page-clientes/page-clientes.component';
import { PageFichaClienteComponent } from './modules/clientes/pages/page-ficha-cliente/page-ficha-cliente.component';
import { PageNotfoundComponent } from './shared/pages/page-notfound/page-notfound.component';
import { PageFichaClienteFinalComponent } from './modules/clientes/pages/page-ficha-cliente-final/page-ficha-cliente-final.component';
import { PageContadorComponent } from './pages/ejemplos/page-contador/page-contador.component';



export const routes: Routes = [
    { path:'', component:HomeComponent},         // localhost:4200    
    { path:'home', component:HomeComponent},    //localhost:4200/home
    { path: 'dashboard', component: DashboardComponent },

    { path: 'contador', component: PageContadorComponent },

    { path: 'lista-clientes', component: PageListaClientesComponent },
    { path: 'lista-clientes-final/:modo', component: PageListaClienteFinalComponent },  //parametro modo para mostrar tabla html vs table primeNg

    //Ejemplo basico de paso de parametro :id (editar un cliente concreto)
    { path: 'ficha-cliente', component: PageFichaClienteComponent },                //ficha cliente sin parametro (uso insercion)
    { path: 'ficha-cliente/editar/:id', component: PageFichaClienteComponent },     //ficha cliente con parametro id  (uso visualización/edición)

    //Ampliacion para pasar como parametro desde el Navbar el tipo de formulario a utilizar
    { path: 'ficha-cliente-final/:modo', component: PageFichaClienteFinalComponent },                //ficha cliente con seleccion tipo formulario por parametro
    { path: 'ficha-cliente-final/editar/:modo/:id', component: PageFichaClienteFinalComponent },     //ficha cliente con seleccion tipo formulario por parametro + id  (uso visualización/edición)

    //Ejemplo de LazzyLoading - Cargando rutas hijas desde el router del modulo contactos
    { path: 'contactos', loadChildren: () => import('./modules/contactos/contactos.module').then( m => m.ContactosModule) },

    { path:'**', component:PageNotfoundComponent},      
    //{ path:'**', redirectTo:'home'} // redirigir a otra pagina por defecto de nuestra app (ej. dashboard/home/...)
];
