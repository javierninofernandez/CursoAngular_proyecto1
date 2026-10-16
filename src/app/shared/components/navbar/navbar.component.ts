/* construccion de una barra de navegacion html dinamica 
 - Definicion de interfaz para propiedades de los items del menu
 - Uso de directivas @for, @if para generacion dinamica del html
 - Uso de [RouterLink], [routerLinkActive] en html para navegacion
 */
import { Component,  } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// modelo de datos para gestionar los diferentes items del menu
interface MenuItem {
  titulo: string;
  path?: string;
  parametro?: string;    //se añade para poder usar parametros adicionales en el router (ej. tipo formulario)
  icono?: string;
  hint?: string;
  isDisabled?: boolean ;
  isDivider?: boolean;
  hijos?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  
  // Inyectamos el Router en el constructor para poder usarlo en la función salir()
  constructor(private router: Router) {}

  titulo = 'Gestor Clientes';

  // Lista de elementos del menu / Permite subdivision en submenu de 1 nivel
  listaRutas: MenuItem[] = [
    { titulo: 'Home', path: '/home', icono: 'bi bi-house-door-fill mx-1', hint: 'Ir a la página de inicio', isDisabled: false },
    { titulo: 'Dashboard', path: '/dashboard', icono: 'bi bi-easel-fill mx-1', hint: 'Ver el panel de control', isDisabled: false },
    { titulo: 'Documentacion', path: '/documentacion', icono: 'bi bi-file-earmark-pdf-fill mx-1', hint: 'Descripcion del proyecto', isDisabled: false },
    { titulo: 'Ejemplos', icono: '<i class="bi bi-hexagon-fill"></i>', hint: 'pruebas', isDisabled: false, 
        hijos: [
          { titulo: 'Contador (signals)', path: '/contador', icono: 'bi bi-123 mx-1', hint: 'Ver el panel de control', isDisabled: false },
          { titulo: 'Comunicacion Padre<->Hijo', path: '/ejemplo-comunicacion', icono: 'bi bi-hexagon-fill mx-1', hint: 'prueba', isDisabled: false },          
        ]
    },
    { titulo: 'Cliente', icono: 'bi bi-people-fill mx-1', hint: 'Gestion clientes', isDisabled: false,
        hijos : [
          { titulo: 'Lista Clientes Basic', path: '/lista-clientes', icono: 'bi bi-card-list mx-1', hint: 'Lista de clientes basica', isDisabled: false },
          { titulo: 'Lista Clientes API', path: '/lista-clientes-final',  parametro: 'html', icono: 'bi bi-card-list mx-1', hint: 'Lista de clientes API', isDisabled: false},
          { titulo: 'Lista Clientes (primeNG)', path: '/lista-clientes-final',  parametro: 'primeng', icono: 'bi bi-card-list mx-1', hint: 'lista clientes con componente primeNG', isDisabled: false},
          { titulo: 'div1', isDivider:true },
          { titulo: 'Nuevo Cliente', path: '/ficha-cliente', icono: 'bi bi-people-fill mx-1', hint: 'Ficha cliente', isDisabled: false },
          { titulo: 'div2', isDivider:true },
          // items de menu con los diferentes formatos de formulario pasados como parametro
          { titulo: 'Nuevo Cliente (ngForm)', path: '/ficha-cliente-final', parametro: 'ngform', icono: 'bi bi-people-fill mx-1', hint: 'Ficha cliente', isDisabled: false },
          { titulo: 'Nuevo Cliente (ReactForm)', path: '/ficha-cliente-final', parametro: 'reactform', icono: 'bi bi-people-fill mx-1', hint: 'Ficha cliente', isDisabled: false },
          { titulo: 'Nuevo Cliente (primeNG)', path: '/ficha-cliente-final', parametro: 'primeng', icono: 'bi bi-people-fill mx-1', hint: 'Ficha cliente', isDisabled: false },
        ]
    },
    { titulo: 'Contactos', icono: 'bi bi-people-fill mx-1', hint: 'contactos', isDisabled: false, 
        hijos: [
          { titulo: 'Lista Contactos', path: '/contactos/lista-contactos', icono: 'bi bi-card-list mx-1', hint: 'Ver el panel de control', isDisabled: false },
          { titulo: 'Ficha Contacto', path: '/contactos/ficha-contactos', icono: 'bi bi-person-vcard mx-1', hint: 'prueba', isDisabled: false },          
        ]
    },    
    { titulo: 'Diplomas', path: '/diplomas', icono: 'bi bi-award mx-1 mx-1', hint: 'Tramites Dilomas', isDisabled: false },
  ];

  // funcion para evaluar si esta activo un ItemMenu hijo -> Marcar activo el Padre
  isMenuItemActive(menuItem: MenuItem): boolean {
      if (!menuItem.hijos?.length) {
          return false;
      }
      return menuItem.hijos.some(subItem => {
          if (!subItem.path) {
              return false;
          }
          return this.router.url === subItem.path || this.router.url.startsWith(subItem.path + '/');
      });
  }

  // Boton Salir
  salir() {    
    localStorage.clear();    // Aquí puedes limpiar sesión/token
  
    // Redirigir al usuario a la página de inicio (ej Login)
    this.router.navigate(['/login']);
  }
}
