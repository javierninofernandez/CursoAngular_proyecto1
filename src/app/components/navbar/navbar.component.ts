import { Component,  } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from "@angular/common";

interface Ruta {
  titulo: string;
  path: string;
  icono?: string;
  hint?: string;
  isDisabled?: boolean ;
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
  
  listaRutas: Ruta[] = [
    //{ titulo: 'Home', path: '/home', icono: 'bi bi-house-door-fill mx-1', hint: 'Ir a la página de inicio', isDisabled: false },
    { titulo: 'Dashboard', path: '/dashboard', icono: 'bi bi-easel-fill mx-1 mx-1', hint: 'Ver el panel de control', isDisabled: false },
    //{ titulo: 'Contador', path: '/prueba', icono: 'bi bi-123 mx-1 mx-1', hint: 'Ver el panel de control' },
    { titulo: 'Ejemplo', path: '/prueba', icono: '<i class="bi bi-hexagon-fill"></i>', hint: 'prueba', isDisabled: true },
    { titulo: 'Lista de Clientes', path: '/lista-clientes', icono: 'bi bi-people-fill mx-1', hint: 'Ver la lista de clientes', isDisabled: false },
    { titulo: 'Clientes', path: '/clientes', icono: 'bi bi-people-fill mx-1', hint: 'Gestión de clientes', isDisabled: false },
  ];


  salir() {    
    localStorage.clear();    // Aquí puedes limpiar sesión/token
    
    // Redirigir al usuario a la página de inicio (ej Login)
    this.router.navigate(['/home']);
  }
}
