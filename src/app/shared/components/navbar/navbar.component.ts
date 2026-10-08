import { Component,  } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// modelo de datos para gestionar los diferentes items del menu
interface MenuItem {
  titulo: string;
  path?: string;
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
    //{ titulo: 'Home', path: '/home', icono: 'bi bi-house-door-fill mx-1', hint: 'Ir a la página de inicio', isDisabled: false },
    { titulo: 'Dashboard', path: '/dashboard', icono: 'bi bi-easel-fill mx-1 mx-1', hint: 'Ver el panel de control', isDisabled: false },
    { titulo: 'Ejemplos', icono: '<i class="bi bi-hexagon-fill"></i>', hint: 'pruebas', isDisabled: false, 
        hijos: [
          { titulo: 'Ejemplo', path: '/prueba', icono: '<i class="bi bi-hexagon-fill"></i>', hint: 'prueba', isDisabled: true },
          { titulo: 'Contador', path: '/prueba', icono: 'bi bi-123 mx-1 mx-1', hint: 'Ver el panel de control', isDisabled: false },
        ]
    },
    { titulo: 'Cliente', icono: 'bi bi-people-fill mx-1', hint: 'Gestion clientes', isDisabled: false,
        hijos : [
          { titulo: 'Lista Clientes Basic', path: '/lista-clientes', icono: 'bi bi-people-fill mx-1', hint: 'Ver la lista de clientes', isDisabled: false },
          { titulo: 'Lista Clientes Final', path: '/lista-clientes-final', icono: 'bi bi-people-fill mx-1', hint: 'Ver la lista de clientes', isDisabled: false},
          //{ titulo: 'Ficha Cliente', path: '/clientes', icono: 'bi bi-people-fill mx-1', hint: 'Gestión de clientes', isDisabled: false },
          { titulo: 'div1', isDivider:true },
          { titulo: 'Nuevo Cliente (ngForm)', path: '/ficha-cliente', icono: 'bi bi-people-fill mx-1', hint: 'Ficha cliente', isDisabled: false },
        ]
    },
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
    this.router.navigate(['/home']);
  }
}
