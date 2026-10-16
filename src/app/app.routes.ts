import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';

import { PageListaClientesComponent } from './modules/clientes/pages/page-lista-clientes/page-lista-clientes.component';
import { PageListaClienteFinalComponent } from './modules/clientes/pages/page-lista-cliente-final/page-lista-cliente-final.component';
//import { PageClientesComponent } from './modules/clientes/pages/page-clientes/page-clientes.component';
import { PageFichaClienteComponent } from './modules/clientes/pages/page-ficha-cliente/page-ficha-cliente.component';
import { PageNotfoundComponent } from './shared/pages/page-notfound/page-notfound.component';
import { PageFichaClienteFinalComponent } from './modules/clientes/pages/page-ficha-cliente-final/page-ficha-cliente-final.component';
import { PageContadorComponent } from './modules/ejemplos/page-contador/page-contador.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { authGuard } from './core/auth/auth.guards'
import { PageComunicacionPadreHijoComponent } from './modules/ejemplos/ejemplo-comunicacion-padre-hijo/page-comunicacion-padre-hijo/page-comunicacion-padre-hijo.component';
import { PageDiplomasComponent } from './modules/diplomas/pages/page-diplomas/page-diplomas.component';
import { PageDescripcionProyectoComponent } from './shared/pages/page-descripcion-proyecto/page-descripcion-proyecto.component';


export const routes: Routes = [
    //{ path:'', component:HomeComponent},         // localhost:4200    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path:'home', component:HomeComponent},    //localhost:4200/home
    { path: 'dashboard', component: DashboardComponent },
    { path: 'documentacion', component: PageDescripcionProyectoComponent },
    
    // ejemplos pùntuales
    { path: 'contador', component: PageContadorComponent, canActivate: [authGuard] },
    { path: 'ejemplo-comunicacion', component: PageComunicacionPadreHijoComponent, canActivate: [authGuard] },

    // area de clientes
    { path: 'lista-clientes', component: PageListaClientesComponent, canActivate: [authGuard] },
    { path: 'lista-clientes-final/:modo', component: PageListaClienteFinalComponent, canActivate: [authGuard] },  //parametro modo para mostrar tabla html vs table primeNg

    //Ejemplo basico de paso de parametro :id (editar un cliente concreto)
    { path: 'ficha-cliente', component: PageFichaClienteComponent, canActivate: [authGuard] },                //ficha cliente sin parametro (uso insercion)
    { path: 'ficha-cliente/editar/:id', component: PageFichaClienteComponent, canActivate: [authGuard] },     //ficha cliente con parametro id  (uso visualización/edición)

    //Ampliacion para pasar como parametro desde el Navbar el tipo de formulario a utilizar
    { path: 'ficha-cliente-final/:modo', component: PageFichaClienteFinalComponent, canActivate: [authGuard] },                //ficha cliente con seleccion tipo formulario por parametro
    { path: 'ficha-cliente-final/editar/:modo/:id', component: PageFichaClienteFinalComponent, canActivate: [authGuard] },     //ficha cliente con seleccion tipo formulario por parametro + id  (uso visualización/edición)

    //Ejemplo de LazzyLoading - Cargando rutas hijas desde el router del modulo contactos
    { path: 'contactos', loadChildren: () => import('./modules/contactos/contactos.module').then( m => m.ContactosModule) , canActivate: [authGuard]},

    // Ejemplo equivalente de carga perezosa con componentes standalon que no requieren estar declarados en un modulo
    /*
    { path: 'contactos',
      children: [
        { path: 'lista-contactos' , loadComponent: () => import('./modules/contactos/pages/page-lista-contactos/page-lista-contactos.component').then( m => m.PageListaContactosComponent ) , canActivate:[authGuard]},
        { path: 'ficha-contactos' , loadComponent: () => import('./modules/contactos/pages/page-ficha-contactos/page-ficha-contactos.component').then( m => m.PageFichaContactosComponent ) , canActivate:[authGuard]},
      ]
    },
    */

    { path: 'diplomas' , component: PageDiplomasComponent, canActivate: [authGuard]},
    
    { path:'**', component:PageNotfoundComponent},      
    //{ path:'**', redirectTo:'home'} // redirigir a otra pagina por defecto de nuestra app (ej. dashboard/home/...)
];
